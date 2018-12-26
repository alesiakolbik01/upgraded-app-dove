const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    gender:{
        type:String
    },
    profession:{
        type:String
    },
    aboutSelf:{
        type:String
    },
    search:{
        type:String
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    likes:[{type:Schema.Types.ObjectId, ref: 'Profile'}],
    matches:[{type:Schema.Types.ObjectId, ref: 'Profile'}]
});

module.exports = mongoose.model('Profile', ProfileSchema);;