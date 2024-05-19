require('dotenv').config()
const mongo_client = require('./mongo_client.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authToken = (username) => {
    jwt.sign({username}, process.env.SECRET, { expiresIn: '7d' });
}

const createAccount = async (username, password) => {
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
