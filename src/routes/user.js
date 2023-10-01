const express = require('express');
const router = new express.Router();
const User = require('../model/user');
const auth = require('../middleware/auth');

router.post('/new', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.generateAuthToken();
        await user.save();
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.json({user, token});
    } catch (error) {
        console.log(error)
        res.status(404).send();
    }
});

router.get('/', auth, (req, res) => {
    console.log(req.user);
    res.send('Yo!')
})


module.exports = router;