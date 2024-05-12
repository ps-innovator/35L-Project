const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

//**this is a basic test of Mongo DB client functionality - need to add more requirements for data passed in later */
//NOTE: must have a .env file in this working directory with the correct credentials for this to work
const uri = `mongodb+srv://${process.env.UNAME}:${process.env.PASSWD}@cluster0.rvqyub2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

const testMongoClientFetch = async () => {
    const reqs = await getRideRequests();
    console.log(reqs);
};

const createRideRequest = async (ride_request) => {
    await client.connect();
    const db = client.db("uclax");
    await db.collection("rideshare_requests").insertOne(ride_request);
    db.close();
};

const getRideRequests = async () => {
    try {
        await client.connect();
        const db = client.db("uclax");
        const rr_collection = db.collection("rideshare_requests");
        const rr_response = await rr_collection.find().toArray();
        return rr_response;
    } catch (error) {
        console.log("Error: ", error);
    }
};

exports.createRideRequest = createRideRequest;
exports.getRideRequests = getRideRequests;
exports.testMongoClientFetch = testMongoClientFetch;

client.close();