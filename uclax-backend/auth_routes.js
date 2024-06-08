const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongo_client = require("./mongo_client.js");
const account = require("./account.js");
const { authTokenVerify } = require("./authmiddleware.js");
const ObjectId = require("mongodb").ObjectId;

router.use(cookieParser());

router.post("/user", authTokenVerify, async (req, res) => {
  const token = req.cookies.token;
  const acc = await account.userDetails(token);
  res.status(200).json({ acc });
});

router.post("/login", async (req, res) => {
  const prevToken = req.cookies.token;
  if (prevToken) {
    res.status(401).json({ errorMessage: "already logged in." });
    return;
  }
  const { username, password } = req.body;
  try {
    await account.login(username, password);
    const token = account.authToken(username);
    res.cookie("token", token);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(401).json({ errorMessage: "incorrect password." });
  }
});

router.post("/createaccount", async (req, res) => {
  console.log(req.body);
  const { username, fullname, contactinfo, password} = req.body;
  try {
    await account.createAccount(username, fullname, contactinfo, password);
    const token = account.authToken(username);
    res.cookie("token", token);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully." });
});

router.post("/username", authTokenVerify, async (req, res) => {
  try {
    const token = req.cookies.token;
    const acc = await account.userDetails(token);
    console.log(acc)
    res.status(200).json({ username: acc.username, token });
  } catch (error) {
    res.status(401).json({msg: "Invalid token"})
  }
});

router.put("/edit_user", authTokenVerify, async (req, res) => {
  const token = req.body.token;
  const acc = await account.userDetails(token);
  const acc_id = { _id: acc._id };
  await account.updateProfile(acc_id, req.body.put_body);
  res.status(200).json({ msg: "Successfully updated." });
});

router.get("/get_friend_requests", authTokenVerify, async (req, res) => {
  try {
    const token = req.cookies.token;
    const acc = await account.userDetails(token);
    const friendRequests = acc.friendRequests;

    // Convert string IDs to ObjectId
    const objectIds = friendRequests.map(id => new ObjectId(id));

    // Fetch usernames for each ID in friendRequests
    const usernamesPromises = objectIds.map(async id => {
        const acc = await mongo_client.getAccountById(id);
        return acc.username; // Only return the username
    });

    // Resolve all promises to get the usernames
    const usernames = await Promise.all(usernamesPromises);

    // Send the usernames as a response
    return res.json({ friendRequests: usernames });
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get_friends", authTokenVerify, async (req, res) => {
  try {
    const token = req.cookies.token;
    const acc = await account.userDetails(token);
    const friends = acc.friends;

    // Convert string IDs to ObjectId
    const objectIds = friends.map(id => new ObjectId(id));

    // Fetch usernames for each ID in friendRequests
    const usernamesPromises = objectIds.map(async id => {
        const acc = await mongo_client.getAccountById(id);
        return acc.username; // Only return the username
    });

    // Resolve all promises to get the usernames
    const usernames = await Promise.all(usernamesPromises);

    // Send the usernames as a response
    return res.json({ friends: usernames });
  } catch (error) {
    console.error("Error fetching friends:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/send_friend_request", authTokenVerify, async (req, res) => {
  console.log(req.body);
  const token = req.body.token;
  const requestedFriendUsername = req.body.requestedFriendUsername;
  const friend = await mongo_client.getAccountData(requestedFriendUsername);
  const requestedFriend = friend._id;
  const acc_info = await account.userDetails(token);
  const curFriendId = { _id: acc_info._id };
  await account.sendFriendRequest(curFriendId, requestedFriend);
  res.status(200).json({ msg: "Successfully updated." });
});

router.put("/accept_friend_request", authTokenVerify, async (req, res) => {
  const token = req.body.token;
  const acceptedFriendUsername = req.body.acceptedFriendUsername;
  const friend = await mongo_client.getAccountData(acceptedFriendUsername);
  const acceptedFriend = friend._id;
  const acc_info = await account.userDetails(token);
  const curFriendId = acc_info._id;
  await account.addFriend(curFriendId, acceptedFriend);
  await account.removeFriendRequest(curFriendId, acceptedFriend);
  res.status(200).json({ msg: "Successfully updated." });
});

router.put("/join_ride", authTokenVerify, async (req, res) => {
  const token = req.body.token;
  const acc_info = await account.userDetails(token);
  const curUserId = acc_info._id;
  await mongo_client.requestJoinRide(req.body.rideId, curUserId);
  res.status(200).json({ msg: "Successfully updated." });
});

router.put("/accept_ride_request", authTokenVerify, async (req, res) => {
  const token = req.body.token;
  const acc_info = await account.userDetails(token);
  const curUserId = acc_info._id;
  await mongo_client.acceptRideRequest(req.body.rideId, req.body.newRiderId);
  res.status(200).json({ msg: "Successfully updated." });
});

router.get("/riderequests", async (req, res) => {
  try {
    
    let filter = {};
    if (req.query.userId)
        filter = { members: new ObjectId(req.query.userId) }
      //filter = { initiator_id: { $eq: new ObjectId(req.query.userId) } };
      const requests = await mongo_client.getRideRequests(filter);
    res.json(requests);
  } catch (error) {
    console.error("Error fetching ride requests:", error);
    res.status(500).send("Error fetching ride requests");
  }
});

router.post("/riderequests", async (req, res) => {
  const {
    initiator_name,
    pickup_point,
    dropoff_point,
    pickup_date,
    pickup_time,
    num_riders_needed,
    uber_or_lyft,
    payment_method,
    token,
  } = req.body;
  const acc_info = await account.userDetails(token);
  const initiator_id = acc_info._id;
  const members = [initiator_id];
  const memberRequests = [];

  rideRequest = {
    initiator_name,
    pickup_point,
    dropoff_point,
    pickup_date,
    pickup_time,
    num_riders_needed,
    uber_or_lyft,
    payment_method,
    initiator_id,
    members,
    memberRequests,
  };

  try {
    await mongo_client.createRideRequest(rideRequest);
    res
      .status(200)
      .json({
        initiator_name,
        pickup_point,
        dropoff_point,
        pickup_date,
        pickup_time,
        num_riders_needed,
        uber_or_lyft,
        payment_method,
      });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
});

router.post('/getjoinrequests', authTokenVerify, async (req, res) => {
    try {
  const token = req.body.token;
  const acc_info = await account.userDetails(token);
  const cur_id = acc_info._id;
  const filter = { initiator_id: cur_id };
  const rides = await mongo_client.getRideRequests(filter);
  const join_reqs = [];
  const acc_infos = [];
  rides.forEach(ride => {
    ride.memberRequests.forEach(member =>  {
        acc_infos.push(mongo_client.getAccountById(member));
        //TODO: update # spots left
        join_reqs.push({id: member, rideId: ride._id, descr: ride.pickup_point + " to " + ride.dropoff_point + " on " + ride.pickup_date + " at " + ride.pickup_time + " (" + 0 + " riders left)", name: "Test"});
    });
  });

  await Promise.all(acc_infos);

  res.json(join_reqs.map(ride => { return { ...ride, name: "test" } } ));
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
});

/*router.post('/pendingrequests', authTokenVerify, async (req, res) => {
    try {
        const token = req.body.token;
        const acc_info = await account.userDetails(token);
        const cur_id = acc_info._id;
        const filter = { memberRequests : cur_id };
        const rides = await mongo_client.getRideRequests(filter);
        const join_reqs = [];
        const acc_infos = [];
        rides.forEach(ride => {
          console.log("there is one ride");
          ride.memberRequests.forEach(member =>  {
              acc_infos.push(mongo_client.getAccountById(member));
              join_reqs.push({id: member, rideId: ride._id, descr: ride.pickup_point + " to " + ride.dropoff_point + " on " + ride.pickup_date + " at " + ride.pickup_time + " (" + 0 + " riders left)", name: "Test"});
          });
        });
      
        await Promise.all(acc_infos);
      
        res.json(join_reqs.map(ride => { return { ...ride, name: "test" } } ));
          } catch (error) {
            console.log(error.message);
              res.status(400).json({ errorMessage: error.message });
          }
});*/

router.delete("/riderequests/:requestId", async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const result = await mongo_client.deleteRideRequest(requestId);
    if (result.deletedCount === 0) {
      return res.status(404).json({ errorMessage: 'Ride request not found' });
    }
    res.status(200).json({ message: 'Ride request deleted successfully' });
  } 
  catch (error) {
    console.error("Error deleting ride request:", error);
    res.status(500).json({ errorMessage: error.message });
  }
});

router.post('/addcomment', authTokenVerify, async (req, res) => {
  try {
    await mongo_client.addComment(req.body.rideId, req.body.comment);
    res.status(200).json({"msg": "Successful!"});
  } catch (error) {
    res.status(400).json({errorMessage: error.message})
  }
});

router.post('/getInfoForIds', authTokenVerify, async (req, res) => {
  try {
    const uinfos = await mongo_client.getMemberInfoforIds(req.body.userIds);
    //console.log(req.body.userIds)
    console.log("RES:::")
    console.log(uinfos);
    res.status(200).json({membersInfo: uinfos})
  } catch (error) {
    res.status(400).json({errorMessage: error.message})
  }
});

module.exports = router;