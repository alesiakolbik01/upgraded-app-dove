const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

exports.generate = async function (password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};

exports.compare = async function (password, hash) {
    return await bcrypt.compare(password, hash);
};