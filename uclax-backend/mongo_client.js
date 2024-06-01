const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

//**this is a basic test of Mongo DB client functionality - need to add more requirements for data passed in later */
//NOTE: must have a .env file in this working directory with the correct credentials for this to work
const uri = process.env.URI || `mongodb+srv://${process.env.UNAME}:${process.env.PASSWD}@cluster0.rvqyub2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

const testMongoClientFetch = async () => {
    const reqs = await getRideRequests();
    console.log(reqs);
};

const createRideRequest = async (ride_request) => {
    try {
        await client.connect();
        const db = client.db("uclax");
        const riderequest_collection = db.collection("rideshare_requests");
        await riderequest_collection.insertOne(ride_request);
        await client.close();
        console.log("Success!");
    } catch {
        console.log("Error connecting to mongodb.");
    }
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

const getAccountData = async (username) => {
    try {
        await client.connect();
        const db = client.db("uclax");
        const login_collection = db.collection("login");
        const account = await login_collection.findOne({ username: username });
        return account;
    } catch(error) {
        console.log("Error: ", error);
    }
}

const createAccount = async (account) => {
    try {
        await client.connect();
        const db = client.db("uclax");
        const login_collection = db.collection("login");
        await login_collection.insertOne(account);
        console.log("Success!");
    } catch {
        console.log("Error connecting to mongodb.");
    }
}


const updateProfile = async (filter_obj, update_obj) => {
    console.log(filter_obj)
    console.log(update_obj)
    try {
        await client.connect();
        const db = client.db("uclax");
        const login_collection = db.collection("login");
        await login_collection.updateOne(filter_obj, update_obj);
    } catch {
        console.log("Error updating")
    }
};

exports.createRideRequest = createRideRequest;
exports.getRideRequests = getRideRequests;
exports.testMongoClientFetch = testMongoClientFetch;
exports.getAccountData = getAccountData;
exports.createAccount = createAccount;
exports.updateProfile = updateProfile;

client.close();
