const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongo_client = require('./mongo_client.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
	//sample response for testing purposes -- pls change later
	res.send({"res": "Test response from UCLAX Server!"});
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  res.status(200).json({ username: `${username}`});
});

app.post('/createaccount', async (req, res) => {
    const { username, password } = req.body;
    const existing_account = mongo_client.getAccountData(username);
    if(existing_account) {
        res.status(400).json({ errorMessage: "account already exists." });
    } else {
        account = {
            username: username,
            password: password
        };
        mongo_client.createAccount(account);
        res.status(200).json({ message: "account created successfully." });
    }
})


const port = process.env.PORT || 3000;

app.listen(port, async () => {
	console.log(`Server is running on port ${port}`);
	mongo_client.testMongoClientFetch();
});
