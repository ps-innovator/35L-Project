const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const mongo_client = require('./mongo_client.js');
const account = require('./account.js');
const { authTokenVerify } = require('./authmiddleware.js');

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
	//sample response for testing purposes -- pls change later
	res.send({"res": "Test response from UCLAX Server!"});
});

app.post('/user', authTokenVerify, async (req, res) => {
    const token = req.cookies.token;
    const acc = await account.userDetails(token);
    res.status(200).json({ acc });
})

app.post('/login', async (req, res) => {
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

app.post('/createaccount', async (req, res) => {
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
})

app.post('/logout', async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully." });
})

app.post('/username', authTokenVerify, async (req, res) => {
    const token = req.cookies.token;
    const acc = await account.userDetails(token);
    res.status(200).json({ username: acc.username, token });
})

const port = process.env.PORT || 3000;

app.listen(port, async () => {
	console.log(`Server is running on port ${port}`);
	// mongo_client.testMongoClientFetch();
});
