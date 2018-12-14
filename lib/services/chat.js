const ChatRoom = require('../../models/Conversation');
const Message = require('../../models/Message');
const User = require('../../models/User');

exports.getConversations = function(userId) {
    // Only return one message from each conversation to display as snippet
    return new Promise((resolve, reject) => {
        ChatRoom.find({ participants: userId })
            .select('_id')
            .exec(function(err, conversations) {
                if (err) {
                    return reject(err);
                }

                // Set up empty array to hold conversations + most recent message
                const fullConversations = [];
                conversations.forEach(function(conversation) {
                    Message.find({ 'conversationId': conversation._id })
                        .sort('-createdAt')
                        .limit(1)
                        .populate({
                            path: "author",
                            select: "profile.firstName profile.lastName"
                        })
                        .exec(function(err, message) {
                            if (err) {
                                return reject(err);
                            }
                            fullConversations.push(message);
                            if (fullConversations.length === conversations.length) {
                                resolve(fullConversations);
                            }
                        });
                });
            });
    });
};

exports.getConversation = function(conversationId) {
    return new Promise((resolve,reject)=>{
        Message.find({ conversationId: conversationId })
            .select('createdAt body author')
            .sort('-createdAt')
            .populate({
                path: 'author',
                select: 'profile.firstName profile.lastName'
            })
            .exec(function(err, messages) {
                if (err) {
                    return reject(new Error(err));
                }
                resolve(messages);
            });
    })
};

exports.newConversation = function(userId, recipientId) {
    if(!recipientId) {
        throw Error('Please choose a valid recipient for your message.');
    }

    const conversation = new ChatRoom({
        participants: [userId, recipientId]
    });

    return conversation.save().then(conversation => {
        return User.updateMany({_id: { $in : [ userId, recipientId ]}}, { $push: { conversations: conversation._id }})
            .then(() => conversation);
    })
};

exports.sendReply = function(conversationId, userId, composedMessage) {
    const reply = new Message({
        conversationId: conversationId,
        body: composedMessage,
        author: userId
    });
    return reply.save()
};