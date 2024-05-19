const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongo_client = require('./mongo_client.js');
const account = require('./account.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
	//sample response for testing purposes -- pls change later
	res.send({"res": "Test response from UCLAX Server!"});
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        await account.login(username,password);
        res.status(200).json({ message: "logged in successfully." });
    } catch (error) {
        res.status(401).json({ errorMessage: "incorrect password." });
    }
});

app.post('/createaccount', async (req, res) => {
    const { username, password } = req.body;
    try {
        await account.createAccount(username,password);
        const token = account.authToken(username);
        res.status(200).json({ token, message: "account created successfully." });
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
})


const port = process.env.PORT || 3000;

app.listen(port, async () => {
	console.log(`Server is running on port ${port}`);
	mongo_client.testMongoClientFetch();
});
