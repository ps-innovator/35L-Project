const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongo_client = require('./mongo_client.js');
const account = require('./account.js');
const { authTokenVerify } = require('./authmiddleware.js');

router.use(cookieParser());

router.post('/user', authTokenVerify, async (req, res) => {
    const token = req.cookies.token;
    const acc = await account.userDetails(token);
    res.status(200).json({ acc });
});

router.post('/login', async (req, res) => {
    const prevToken = req.cookies.token;
    if(prevToken) {
        res.status(401).json({ errorMessage: "already logged in." });
        return;
    }
    const { username, password } = req.body;
    try {
        await account.login(username,password);
        const token = account.authToken(username);
        res.cookie('token', token);
        res.status(200).json({ username, token });
    } catch (error) {
        res.status(401).json({ errorMessage: "incorrect password." });
    }
});

router.post('/createaccount', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    try {
        await account.createAccount(username,password);
        const token = account.authToken(username);
        res.cookie('token', token);
        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
});

router.post('/logout', async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully." });
});

router.post('/username', authTokenVerify, async (req, res) => {
    const token = req.cookies.token;
    const acc = await account.userDetails(token);
    res.status(200).json({ username: acc.username, token });
});

module.exports = router;
