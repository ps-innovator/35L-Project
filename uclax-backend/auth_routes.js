const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongo_client = require('./mongo_client.js');
const account = require('./account.js');
const { authTokenVerify } = require('./authmiddleware.js');
const ObjectId = require('mongodb').ObjectId;


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

router.put('/join_ride', authTokenVerify, async (req, res) => {
	const token = req.body.token;
	const acc_info = await account.userDetails(token);
	const curUserId = acc_info._id;
	await mongo_client.requestJoinRide(req.body.rideId, curUserId);
	res.status(200).json({"msg": "Successfully updated."});
});

router.put('/accept_ride_request', authTokenVerify, async (req, res) => {
	const token = req.body.token;
	const acc_info = await account.userDetails(token);
	const curUserId = acc_info._id;
	await mongo_client.acceptRideRequest(req.body.rideId, req.body.newRiderId);
	res.status(200).json({"msg": "Successfully updated."});
});

router.get('/riderequests', async (req, res) => {
    try {
	let filter = {}
	if (req.query.userId)
	    filter = { initiator_id: { $eq: new ObjectId(req.query.userId) } };
	console.log(filter)
        const requests = await mongo_client.getRideRequests(filter);
        res.json(requests);
    } catch (error) {
        console.error('Error fetching ride requests:', error);
        res.status(500).send('Error fetching ride requests');
    }
});

router.post('/riderequests', async (req, res) => {
	const {initiator_name, pickup_point, dropoff_point, pickup_date, pickup_time, num_riders_needed, token} = req.body;
	const acc_info = await account.userDetails(token);
	const initiator_id = acc_info._id;
	const members = [];
	const memberRequests = [];

	rideRequest = {
		initiator_name,
        pickup_point,
        dropoff_point,
        pickup_date,
        pickup_time,
        num_riders_needed,
	initiator_id,
	members,
	memberRequests
	};

	try {
		await mongo_client.createRideRequest(rideRequest);
		res.status(200).json({ initiator_name, pickup_point, dropoff_point, pickup_date, pickup_time, num_riders_needed });
	} catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
});


module.exports = router;
