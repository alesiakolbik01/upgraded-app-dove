const express = require('express');
const router = express.Router();

const userService = require('../lib/services/user');
const profileService = require('../lib/services/profile');
const multer = require('multer');
const validateProfileInput = require('../validation/profile');
const UPLOAD_FOLDER = 'uploads/';
const file = require('../lib/file');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_FOLDER)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage: storage});

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
    const user = await userService.findOne({_id: req.params.userId});

    if (user) {
        const profile = await profileService.findOne({_id: user.profile._id});

        if (profile) {
            return res.status(200).json({profile});
        }

        return res.status(404).json({errors: 'Profile is not found'})
    }

    res.status(404).json({errors: 'User is not found'})
});

router.put('/:id', upload.single('file'), async function (req, res) {
    const profileData = JSON.parse(req.body.profile);
    profileData.file = req.file;

    const {errors, isValid} = validateProfileInput(profileData);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    try {
        if (profileData.file) {
            profileData.image = file.toBase64(profileData.file.filename);
        }
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