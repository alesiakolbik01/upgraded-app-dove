const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userService = require('../lib/services/user');
const profileService = require('../lib/services/profile');
const hash = require('../lib/hash');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const SECRET = '280a6cde-5919-4b49-bb21-fbc6e9d30251';

router.post('/register', async (req, res) => {

    const userData = req.body;
    const {errors, isValid} = validateRegisterInput(userData);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {
        const user = await userService.findOne({name: userData.name});
        if (user) {
            return res.status(400).json({name: 'User name already exists'});
        } else {
            userData.imagePath = userData.image;
            userData.password = await hash.generate(userData.password);
            const user = await userService.save(userData);
            const profile = await profileService.save(user._id, userData);
            await userService.saveUserProfile(user._id, profile._id);

            res.sendStatus(201);
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});

router.post('/login', async (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const name = req.body.name;
    const password = req.body.password;

    try {
        const user = await userService.findOne({name});
        if (!user) {
            return res.status(404).json({name: 'User not found'});
        }
        const isMatch = await hash.compare(password, user.password);
        if (isMatch) {
            const payload = {
                id: user._id,
                name: user.name
            };
            const token = jwt.sign(payload, SECRET, {expiresIn: 3600});

            res.status(200).json({
                success: true,
                token: `Bearer ${token}`
            });
        }
        else {
            return res.status(400).json({password: 'Incorrect Password'});
        }
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

router.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name
    });
});

module.exports = router;