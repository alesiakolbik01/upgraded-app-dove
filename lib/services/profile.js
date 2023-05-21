const Profile = require('../../models/Profile');


exports.findOne = function (condition) {
    return new Promise((resolve, reject) => {
        return Profile.findOne(condition).populate('user').lean().exec((error, p) => {
            if (error) {
                return reject(error);
            }

            deleteUserCredentials(p);

            return resolve(p);
        });
    });
};

exports.find = function (excludedId) {
    return new Promise((resolve, reject) => {
        return Profile.find({ likes: {$ne : excludedId}}).lean().exec((error, profiles) => {
            if (error) {
                return reject(error);
            }

            const profilesList = profiles.reduce((accumulator, current) => {
                deleteUserCredentials(current);

                return accumulator.concat(current);
            }, []);

            return resolve(profilesList);
        });
    });
};

exports.findLiked = function (profileId) {
    return new Promise((resolve, reject) => {
        return Profile.findOne({_id: profileId})
            .populate('likes')
            .populate({
                path: 'user',
                populate: {path: 'conversations'}
            })
            .lean()
            .exec((error, profile) => {
                if (error) {
                    return reject(error);
                }

                const profilesList = profile.likes.reduce((accumulator, current) => {
                    if(profile.user.conversations) {
                        const conversation = profile.user.conversations
                            .find(c => c.participants.some(p=> p.toString() === current.user.toString()));
                        if (conversation) {
                            current.conversation = conversation._id;
                        }
                    }
                    deleteUserCredentials(current);
                    delete current.likes;
                    return accumulator.concat(current);
                }, []);

                return resolve(profilesList);
            });
    });
};

exports.findMatched = function (profileId) {
    return new Promise((resolve, reject) => {
        return Profile.findOne({_id: profileId})
            .populate('matches')
            .populate({
                path: 'user',
                populate: {path: 'conversations'}
            })
            .lean()
            .exec((error, profile) => {
                if (error) {
                    return reject(error);
                }

                const profilesList = profile.matches.reduce((accumulator, current) => {
                    if(profile.user.conversations) {
                        const conversation = profile.user.conversations
                            .find(c => c.participants.some(p=> p.toString() === current.user.toString()));
                        if (conversation) {
                            current.conversation = conversation._id;
                        }
                    }
                    deleteUserCredentials(current);
                    delete current.matches;
                    return accumulator.concat(current);
                }, []);

                return resolve(profilesList);
            });
    });
};

exports.save = function (userId, { age, firstName, lastName, gender = '', profession = '',
    aboutSelf = '', search = '', imagePath}) {
    const profile = new Profile({
        age,
        firstName,
        lastName,
        imagePath,
        gender,
        profession,
        aboutSelf,
        search,
        user: userId,
        likes:[]
    });
    return profile.save();
};

exports.update = function (condition, profileDate) {
    return new Promise((resolve, reject) => {
        return Profile.findOneAndUpdate(condition, profileDate, { new: true }).populate('user').lean().exec((error, p) => {
            if (error) {
                return reject(error);
            }

            deleteUserCredentials(p);

            return resolve(p);
        });
    });
};

exports.like = function (profileId, likedProfileId) {
    return Profile.findOneAndUpdate({_id:likedProfileId},{$push:{likes:profileId}});
};

function deleteUserCredentials(profile){
    delete profile.user.password;
    delete profile.user.profile;
}

exports.match = async function (profileId, likedProfileId) {
    await Profile.findOneAndUpdate({_id:likedProfileId},{$push:{matches:profileId}});
    await Profile.findOneAndUpdate({_id:profileId},{$push:{matches:likedProfileId}});
};


