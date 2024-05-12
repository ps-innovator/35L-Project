const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongo_client = require('./mongo_client.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
	//sample response for testing purposes -- pls change later
	res.send({"res": "Test response from UCLAX Server!"});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	mongo_client.testMongoClientFetch();
});
