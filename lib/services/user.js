const User = require('../../models/User');
const file = require('../file');

exports.findOne = function (condition) {
    return new Promise((resolve, reject) => {
        return User.findOne(condition).populate('profile').lean().exec((error, u) => {
            if(error) {
                return reject(error);
            }

            if(u && u.profile) {
                u.profile.image = file.toBase64(u.profile.imagePath);
                delete u.profile.imagePath;
            }

            return resolve(u);
        });
    });

};

exports.save = function ({ name, password }) {
    const user = new User({
            name,
            password
    });
    return user.save();
};

exports.saveUserProfile = function (userId, profileId) {
    return User.findByIdAndUpdate(userId, { 'profile': profileId });
};