const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
    conversations: [{type: Schema.Types.ObjectId, ref: 'Conversation'}]
});
module.exports = mongoose.model('User', UserSchema);