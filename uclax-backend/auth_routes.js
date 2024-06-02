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


router.put('/edit_user', authTokenVerify, async (req, res) => {
	const token = req.body.token;
	const acc = await account.userDetails(token);
	const acc_id = { '_id': acc._id };
	await account.updateProfile(acc_id, req.body.put_body);
	res.status(200).json({"msg": "Successfully updated."});
});

router.put('/send_friend_request', authTokenVerify, async (req, res) => {
	const token = req.body.token;
	const requestedFriend = req.body.friendId;
	const acc_info = await account.userDetails(token);
	const curFriendId = { '_id': acc_info._id } ;
	await account.sendFriendRequest(curFriendId, requestedFriend);
	res.status(200).json({"msg": "Successfully updated."});
});

router.put('/accept_friend_request', authTokenVerify, async (req, res) => {
	const token = req.body.token;
	const acceptedFriend = req.body.friendId;
	const acc_info = await account.userDetails(token);
	const curFriendId = acc_info._id ;
	await account.addFriend(curFriendId, acceptedFriend);
	res.status(200).json({"msg": "Successfully updated."});
});

module.exports = router;
