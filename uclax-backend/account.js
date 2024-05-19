require('dotenv').config()
const mongo_client = require('./mongo_client.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authToken = (username) => {
    const token = jwt.sign({username}, process.env.SECRET, { expiresIn: '7d' });
    return token;
}

const createAccount = async (username, password) => {
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
            password: hashedPassword
        };
        await mongo_client.createAccount(account);
    }
}

const userDetails = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const username = decoded.username;
        const acc = await mongo_client.getAccountData(username);
        if(!acc) {
            throw Error("Account doesn't exist.");
        }
        return acc;
    } catch (error) {
        console.error('Error decoding token: ', error);
    }
}

const login = async (username, password) => {
    const existing_account = await mongo_client.getAccountData(username);
    const match = await bcrypt.compare(password, existing_account.password);
    if(!match) {
        throw Error("incorrect password.");
    }
}

exports.createAccount = createAccount;
exports.login = login;
exports.authToken = authToken;
exports.userDetails = userDetails;
