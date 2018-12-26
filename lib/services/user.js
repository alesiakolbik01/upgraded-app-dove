const User = require('../../models/User');

exports.findOne = function (condition) {
    return new Promise((resolve, reject) => {
        return User.findOne(condition).populate('profile').lean().exec((error, u) => {
            if(error) {
                return reject(error);
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