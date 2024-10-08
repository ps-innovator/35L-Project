import { useState, useContext, useEffect } from "react";
import { AuthContext, TabContext } from "../App.jsx";

//Cosmetic Imports
import carAsset from "/car.png";
import uclaxLogo from "/uclaxLogo.png";
import airplane from "/airplane.png"
import comm from "/peopleCommunicating.png";
import CardView from "../components/CardView.jsx";
import TrashButton from "../components/trash.jsx";
import StaticCardView from "../components/StaticCardView.jsx";
import CommentSection from '../components/CommentSection.jsx';

const HomePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { tab, setTab } = useContext(TabContext);
  const [view, setView] = useState("home");
  const [userInfo, setUserInfo] = useState({});
  const [myRides, setMyRides] = useState([]);
  const [rideRequesters, setRideRequesters] = useState([]);
  const [rideRequestsByMe, setRideRequestsByMe] = useState([]);
  const [ridesToMembers, setRidesToMembers] = useState({});
  const [rideDetails, setRideDetails] = useState([]);

  const fetchUserInfo = async () => {
    if (!auth || !auth.token) return;
    console.log(auth)
    let ridesFetch = [];
    const fetchedUserInfoRaw = await fetch("http://localhost:3000/auth/user", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: auth.token }),
    });

    const userInfoFetchJson = await fetchedUserInfoRaw.json();
    setUserInfo(userInfoFetchJson.acc);
    if (userInfoFetchJson.acc.requestedRides.length !== 0) {
      setRideRequestsByMe(userInfoFetchJson.acc.requestedRides);
    }
    
    await fetch(
      `http://localhost:3000/auth/riderequests?userId=${
        userInfoFetchJson.acc._id ? userInfoFetchJson.acc._id : ""
      }`
    )
      .then((data) => data.json())
      .then(data => { setMyRides(data); ridesFetch = data; });
      console.log(auth.token)
     
    await fetch("http://localhost:3000/auth/getjoinrequests", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: auth.token }),
      }).then(data => data.json()).then(data => setRideRequesters(data)); // console.log(data))
      console.log("p1 getting member info.")

      ridesFetch.forEach(async (ride) => {
        console.log("getting member info.")
        await fetch('http://localhost:3000/auth/getInfoForIds', {
          method: "POST",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token: auth.token, userIds: ride.members })
        }).then(data => data.json())
        .then(data => { setRidesToMembers(prevState => ({...prevState, [ride._id]: data.membersInfo})); console.log(data) })
        .catch(err => console.error(err))
      });
    
    /*console.log(myRides)
    await fetch("http://localhost:3000/auth/pendingrequests", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: auth.token }),
    }).then(data => data.json()).then(data => setRideRequestsByMe(data)); // console.log(data))


    //await fetch(`http://localhost:3000/auth/getUsers`)
  };*/
  };

  const handleJoinRequest = (requesterObj) => {
    return async () => {
      await fetch("http://localhost:3000/auth/accept_ride_request", {
        method: "PUT",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: auth.token, rideId: requesterObj.rideId, newRiderId: requesterObj.id})
      });
      await fetchUserInfo();
    };
  };

  const postComment = async (text) => {
    await fetch("http://localhost:3000/auth/addcomment", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: auth.token, rideId: requesterObj.rideId, newRiderId: requesterObj.id})
      });
  };

  const fetchRideRequestDetails = async (rideRequestId) => {
    try {
      const response = await fetch(`http://localhost:3000/auth/getRideFromId/${rideRequestId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ride request details:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const detailedData = await Promise.all(
          rideRequestsByMe.map(async (request) => {
            const details = await fetchRideRequestDetails(request);
            return details;
          })
        );
        setRideDetails(detailedData);
      } catch (error) {
        console.error('Error fetching ride request details:', error);
      }
    };

    if (rideRequestsByMe.length > 0) {
      fetchRideDetails();
    }
  }, [rideRequestsByMe]);

  useEffect(() => {
    fetchUserInfo();
  }, [auth]);

  if (!auth || !auth.token) { //If user is not logged in:
    if (view === "login") {
      setTab(1);
    } else if (view === "signup") {
      setTab(2);
    }
    return (
      <>
        <div>
          <h1
            className="text-2xl text-black dark:text-white"
            style={{
              marginTop: "5%",
              marginBottom: "5%",
              fontWeight: "500",
              fontSize: 60,
            }}
          >
            Welcome to UCLAX!
          </h1>

          <StaticCardView
            header="Ridesharing Made Simple."
            shortDescr="Made for UCLA Students."
            longDescr="College and flights are expensive enough—getting to the airport shouldn't be.
                Split costs with your fellow Bruins to get to LAX, make travel buddies, and make your flight."
            imgsrc={uclaxLogo}
            imgalt="Image of a plane whose trail is a spiral road. Caption is UCLAX."
          />

          <StaticCardView
            header="Make Travel Buddies!"
            shortDescr="Comment on Posts."
            longDescr="Easily indicate whether you're interested in a ride.
                Enjoyed riding with someone? Send a friend request! 
                If you're looking for a ride, you can search for ride posts made by your friends."
            imgsrc={comm}
            imgalt="Image of a two people talking with a phone between them."
          />

          <StaticCardView
            header="Splitting a ____ has never been easier."
            shortDescr="Customize your profile and post to allow for easy matches."
            longDescr="Select your preferred ridesharing service, your preferred pickup location, and what LAX Terminal you're going to."
            imgsrc={carAsset}
            imgalt="Image of a white car driving."
          />
        </div>
        
        <div className = "flex justify-center">
          <button
            onClick={() => setView("login")}
            className="items-center bg-blue-900 text-white p-4 rounded-lg shadow-md max-w-xs transition-colors duration-300 ease-in-out text-lg leading-tight font-medium dark:bg-white dark:text-blue-900 hover:black hover:text-white dark:hover:bg-blue-900 dark:hover:text-white cursor-pointer mb-4"
          >
          Log in to view rides!
          </button>
        </div>
        
        <div>
          <button
            onClick={() => setView("signup")}
            className="text-lg leading-tight font-medium text-black dark:text-zinc-400 hover:underline"
          >
            New User? Sign Up now!
            </button>
          </div>
      </>
    );
  } else { //Once user is logged in
    const myInitiatedRides = myRides.filter(ride => ride.initiator_id == userInfo._id);
    const ridesIJoined = myRides.filter(ride => ride.initiator_id != userInfo._id);

    console.log(ridesToMembers)
    return (
      <>
        <div>
          <h1 className="text-center text-2xl font-medium mt-10 text-white">Incoming Ride Split Requests</h1>
          <h2 className="text-center text-md mt-2 mb-4 text-white">Accept other users into your ride pool.</h2>
          <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 gap-4">
              {rideRequesters.length === 0 ? (
                <div className="text-gray-400 italic">No users have requested to join your ride pool at this time. </div>
              ) : (
              rideRequesters.map(requester => (
                <div className="bg-gray-600 text-white rounded-xl px-10 py-2">
                <div className="mt-4">You have received a request to join your ride pool:</div>
                <div>{requester.descr}</div>
                <div className="flex justify-center mt-4">
                  <button
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleJoinRequest(requester)}
                  >
                    Accept Request
                  </button>
                </div>
              </div>))
              )}
          </div>
          </div>
        </div>
        <div>
          <h1 className="text-center text-2xl font-medium mt-10 text-white">Outgoing Ride Split Requests</h1>
          <h2 className="text-center text-md mt-2 text-white">Your pending ride requests.</h2>
          <h2 className="text-center text-md mt-1 mb-4 text-white">When the user accepts your request, you'll see the ride pool under "Rides I Joined"</h2>
          <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-4">
          {rideRequestsByMe.length === 0 ? (
            <div className="text-gray-400 italic">No pending requests. Find A Ride and Request to Join. </div>
          ) : (
            rideRequestsByMe.map((request, index) => (
              <div key={index} className="bg-gray-600 text-white rounded-xl px-10 py-2">
                {rideDetails[index] ? (
                  <div>
                    <div>
                      You requested to join {rideDetails[index].initiator_name}'s ride pool from {rideDetails[index].pickup_point} to {rideDetails[index].dropoff_point} on {rideDetails[index].pickup_date} at {rideDetails[index].pickup_time}.
                    </div>
                  </div>
                ) : (
                  "Fetching details..."
                )}
              </div>
            ))
          )}
    </div>
          </div>
        </div>
        <div className="mt-10 min-h-screen bg-white dark:bg-gray-900 text-white grid grid-cols-2">
          <div>
          <h1 className="text-center text-4xl font-bold mt-8 mb-4">My Initiated Rides</h1>
          <div className="grid grid-cols-1 gap-4">
            {myInitiatedRides.map((ride, index) => {
              return (
                <CardView
                key={index}
                header={
                  ride.initiator_name
                }
                shortDescr1={`Pickup: ${ride.pickup_point}`}
                shortDescr2={`Dropoff: ${ride.dropoff_point}`}
                shortDescr3={`Date: ${ride.pickup_date}`}
                shortDescr4={`Time: ${ride.pickup_time}`}
                longDescr={`Total People Needed: ${ride.num_riders_needed}`}
                imgsrc={airplane}
                imgalt="Cute airplane clipart">
                  <div className="mt-0 font-bold">All Riders:</div>
                  {
                    ridesToMembers[ride._id] ? ridesToMembers[ride._id].map((member) => (<div>{member.fullname} - Contact: {member.contactinfo}</div>)) : <span>Loading...</span>
                  }
                  <div className="mt-4 font-bold">Comments:</div>

                  <TrashButton deleteConfirmation="Are you sure you want to delete this ride request?" requestId={ride._id} onDelete={fetchUserInfo} />
                  <CommentSection comments={ride.comments ? ride.comments : []} rideId={ride._id} reloadData={fetchUserInfo} name={userInfo.fullname ? userInfo.fullname : "Anonymous"} />
                </CardView>
              ) })}
          </div>
          </div>
          <div>
          <h1 className="text-center text-4xl font-bold mt-8 mb-4">Rides I Joined</h1>
          {ridesIJoined ? (
            <div className="grid grid-cols-1 gap-4">
              {ridesIJoined.map((ride, index) => (
                <CardView
                key={index}
                header={
                  ride.initiator_name
                }
                shortDescr1={`Pickup: ${ride.pickup_point}`}
                shortDescr2={`Dropoff: ${ride.dropoff_point}`}
                shortDescr3={`Date: ${ride.pickup_date}`}
                shortDescr4={`Time: ${ride.pickup_time}`}
                longDescr={`Total People Needed: ${ride.num_riders_needed}`}
                imgsrc={airplane}
                imgalt="Cute airplane clipart">
                  <div className="mt-0 font-bold">All Riders:</div>
                  {
                    ridesToMembers[ride._id] ? ridesToMembers[ride._id].map((member) => (<div>{member.fullname} - Contact: {member.contactinfo}</div>)) : <span>Loading...</span>
                  }
                  <div className="mt-4 font-bold">Comments:</div>
              <CommentSection comments={ride.comments ? ride.comments : []} rideId={ride._id} reloadData={fetchUserInfo} name={userInfo.fullname ? userInfo.fullname : "Anonymous"} />

                </CardView>
              ))}
            </div>
          ) : (
            <h5 className="dark:text-white text-black">Loading...</h5>
          )}
          </div>
        </div>
      </>
    );
  }
};

export default HomePage;