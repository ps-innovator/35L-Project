require('dotenv').config()
const mongo_client = require('./mongo_client.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authToken = (username) => {
    const token = jwt.sign({username}, process.env.SECRET, { expiresIn: '7d' });
    return token;
}

const createAccount = async (username, fullname, contactinfo, password) => {
    console.log(username + " " + password);
    const existing_account = await mongo_client.getAccountData(username);
    if(existing_account) {
        console.log(JSON.stringify(existing_account));
        throw Error("Account already exists.");
    } else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        account = {
            username: username,
            password: hashedPassword,
            fullname: fullname,
            contactinfo: contactinfo,
	          friends: [],
	          friendRequests: [],
	          rides: [],
              requestedRides: []
        };
        await mongo_client.createAccount(account);
    }
}

const updateProfile = async (filter_obj, update_obj) => {
    mongo_client.updateProfile(filter_obj, update_obj);
};

const sendFriendRequest = async (curFriendId, requestedFriendId) => {
	mongo_client.sendFriendRequest(requestedFriendId, curFriendId);
};

const acceptFriendRequest = async (curFriendId, requesterFriendId) => {
	mongo_client.addFriend(curFriendId, requesterFriendId);

};

const removeFriendRequest = async (curFriendId, requesterFriendId) => {
    mongo_client.removeFriendRequest(curFriendId, requesterFriendId);
}

const userDetails = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const username = decoded.username;
        const acc = await mongo_client.getAccountData(username);
        
        return acc;
    } catch (error) {
        if(!acc) {
            console.error("Account doesn't exist.");
        }
        console.error('Error decoding token: ', error);
    }
}

const login = async (username, password) => {
    const existing_account = await mongo_client.getAccountData(username);
    const match = await bcrypt.compare(password, existing_account.password);
    console.log(password)
    console.log(existing_account.password)
    console.log(match)
    if(!match) {
        throw Error("incorrect password.");
    }
}

exports.createAccount = createAccount;
exports.login = login;
exports.authToken = authToken;
exports.userDetails = userDetails;
exports.updateProfile = updateProfile;
exports.sendFriendRequest = sendFriendRequest;
exports.removeFriendRequest = removeFriendRequest;
exports.addFriend = acceptFriendRequest;
