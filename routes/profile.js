const express = require('express');
const router = express.Router();

const userService = require('../lib/services/user');
const profileService = require('../lib/services/profile');
const validateProfileInput = require('../validation/profile');


router.get('/', async function (req, res) {
    let profiles;
    if (req.query.liked) {
        profiles = await profileService.findLiked(req.user.profile._id);
    }
    else if(req.query.matched) {
        profiles = await profileService.findMatched(req.user.profile._id);
    }
    else {
        profiles = await profileService.find(req.user.profile._id);
    }
    res.status(200).json(profiles);
});

router.get('/:userId', async function (req, res) {
    try
    {
        const user = await userService.findOne({_id: req.params.userId});

        if (user) {
            const profile = await profileService.findOne({_id: user.profile._id});

            if (profile) {
                return res.status(200).json({profile});
            }

            return res.status(404).json({errors: 'Profile is not found'})
        }
    }
    catch(er) {
        console.log(er)
    }

    res.status(404).json({errors: 'User is not found'})
});

router.put('/:id', async function (req, res) {
    const profileData = req.body;

    const {errors, isValid} = validateProfileInput(profileData);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    try {
        profileData.imagePath = profileData.image;
        const profile = await profileService.update({_id: req.params.id}, profileData);

        res.status(200).json({profile});
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});

router.post('/like', async function (req, res) {
    try {
        await profileService.like(req.user.profile, req.body.profileId);
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }

});

router.post('/match', async function (req, res) {
    try {
        await profileService.match(req.user.profile, req.body.profileId);
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }

});

module.exports = router;