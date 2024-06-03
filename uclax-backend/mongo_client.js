const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
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


const updateCollection = async (filter_obj, update_obj, collection) => {
    console.log(filter_obj)
    console.log(update_obj)
    try {
        await client.connect();
        const db = client.db("uclax");
        const login_collection = db.collection(collection);
        await login_collection.updateOne(filter_obj, update_obj);
    } catch {
        console.log("Error updating")
    }
};

const updateProfile = async (filter_obj, update_obj) => {
	updateCollection(filter_obj, update_obj, "login");
};

const updateRideRequest = async (filter_obj, update_obj) => {
	updateCollection(filter_obj, update_obj, "rideshare_requests");
};

const sendFriendRequest = async (requestedFriendId, requesterId) => {
	const updateObj = { '$push': { friendRequests: { '$each': [requesterId['_id']] } } };
	const filterObj = { '_id': new ObjectId(requestedFriendId) } ;
	updateProfile(filterObj, updateObj);
};

const addFriend = async (curFriendId, friendToAddId) => {
	//add friend_to_add to current friend's list
	const filterObj1 = { '_id': curFriendId } ;
	const updateObj1 = { '$push': { friends: { '$each': [(new ObjectId(friendToAddId))] } } , '$pull': { friendRequests: { '$in': [(new ObjectId(friendToAddId))]  } } };
	updateProfile(filterObj1, updateObj1);

	//add cur friend to friend_to_add's list
	const filterObj2 = { '_id': new ObjectId(friendToAddId) } ;
	const updateObj2 = { '$push': { friends: { '$each': [curFriendId] } }, '$pull': { friendRequests: { '$in': [curFriendId] } } };
	updateProfile(filterObj2, updateObj2);


};

const requestJoinRide = async (rideId, requesterId) => {
	const updateObj = { '$push': { memberRequests: { '$each': [requesterId] } } };
	const filterObj = { '_id': new ObjectId(rideId) } ;
	updateRideRequest(filterObj, updateObj);
};

const acceptRideRequest = async (rideId, acceptedRiderId) => {
	const updateObj = { '$push': { members: { '$each': [new ObjectId(acceptedRiderId)] } }, '$pull': { memberRequests: { '$in': [new ObjectId(acceptedRiderId)] }  } };
	const filterObj = { '_id': new ObjectId(rideId) } ;
	updateRideRequest(filterObj, updateObj);
};

exports.createRideRequest = createRideRequest;
exports.getRideRequests = getRideRequests;
exports.testMongoClientFetch = testMongoClientFetch;
exports.getAccountData = getAccountData;
exports.createAccount = createAccount;
exports.updateProfile = updateProfile;
exports.sendFriendRequest = sendFriendRequest;
exports.addFriend = addFriend;
exports.requestJoinRide = requestJoinRide;
exports.acceptRideRequest = acceptRideRequest;

client.close();
