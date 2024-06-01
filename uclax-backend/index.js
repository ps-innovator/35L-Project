const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongo_client = require('./mongo_client.js');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.get('/', (req, res) => {
	//sample response for testing purposes -- pls change later
	res.send({"res": "Test response from UCLAX Server!"});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	mongo_client.testMongoClientFetch();
});

app.post('/riderequests', async (req, res) => {
	const {initiator_name, pickup_point, dropoff_point, pickup_time, num_riders_needed} = req.body;
	
	rideRequest = {
		initiator_name,
        pickup_point,
        dropoff_point,
        pickup_time,
        num_riders_needed
	};

	try {
		await mongo_client.createRideRequest(rideRequest);
		res.status(200).json({ initiator_name, pickup_point, dropoff_point, pickup_time, num_riders_needed });
	} catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
});

