const express = require('express');
const router = express.Router();

const chatService = require('../lib/services/chat');
//const validateChatInput = require('../validation/chat');

router.get('/', async function (req, res) {
    try {
        const chats = await chatService.getConversations(req.user._id);

        res.status(200).json(chats);
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});

router.get('/:id', async function (req, res) {
    try {
        const chat = await chatService.getConversation(req.params.id);
        if (chat) {
            return res.status(200).json({chat});
        }

        return res.status(404).json({errors: 'Chat is not found'})
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});

router.post('/:id', async function (req, res) {
    try {
        const message = await chatService.sendReply(req.params.id, req.user._id, req.body.message);

        return res.status(200).json({message});
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});

router.post('/new/:recipientId', async function (req, res) {
    try {
        const chat = await chatService.newConversation(req.user._id, req.params.recipientId);

        return res.status(200).json({chat});
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});

module.exports = router;