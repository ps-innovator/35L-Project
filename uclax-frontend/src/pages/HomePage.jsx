import { useState, useContext, useEffect } from "react";
import { AuthContext, TabContext } from "../App.jsx";

//Cosmetic Imports
import carAsset from "/car.png";
import uclaxLogo from "/uclaxLogo.png";
import comm from "/peopleCommunicating.png";
import CardView from "../components/CardView.jsx";
import DeleteCardView from "../components/DeleteCardView.jsx";
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

  const fetchUserInfo = async () => {
    if (!auth || !auth.token) return;
    const fetchedUserInfoRaw = await fetch("http://localhost:3000/auth/user", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: auth.token }),
    });
    const userInfoFetchJson = await fetchedUserInfoRaw.json();
    setUserInfo(userInfoFetchJson.acc);
    await fetch(
      `http://localhost:3000/auth/riderequests?userId=${
        userInfoFetchJson.acc._id ? userInfoFetchJson.acc._id : ""
      }`
    )
      .then((data) => data.json())
      .then(data => { setMyRides(data); });
      console.log(auth.token)
     
    await fetch("http://localhost:3000/auth/getjoinrequests", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: auth.token }),
      }).then(data => data.json()).then(data => setRideRequesters(data)); // console.log(data))
    
    

    //await fetch(`http://localhost:3000/auth/getUsers`)
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
    return (
      <>
        <div>
          <h1 className="text-center text-2xl font-medium my-8 text-white">Ride Split Requests</h1>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-4">
              {rideRequesters.map(requester => (
            <div className="bg-gray-600 text-white rounded-xl px-10 py-2" onClick={handleJoinRequest(requester)}>
              {requester.name}: Request to join TRIP: {requester.descr}
            </div>))}
            </div>
          </div>
        </div>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-white grid grid-cols-2">
          <div>
          <h1 className="text-center text-4xl font-bold my-8">My Initiated Rides</h1>
          <div className="grid grid-cols-1 gap-4">
            {myInitiatedRides.map((ride, index) => (
                <CardView
                key={index}
                header={
                  ride.initiator_name
                }
                requestId={ride._id}
                shortDescr1={`Pickup: ${ride.pickup_point}`}
                shortDescr2={`Dropoff: ${ride.dropoff_point}`}
                shortDescr3={`Date: ${ride.pickup_date}`}
                shortDescr4={`Time: ${ride.pickup_time}`}
                longDescr={`People: ${ride.num_riders_needed}`}
                imgsrc="https://th.bing.com/th/id/OIP.XVeIdoKEIK7SXK6yN3hEOQHaGs?w=185&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                imgalt="Cute airplane clipart">
                  <CommentSection comments={ride.comments ? ride.comments : []} rideId={ride._id} reloadData={fetchUserInfo} name={userInfo.fullname ? userInfo.fullname : "Anonymous"} />
                </CardView>
              ))}
          </div>
          </div>
          <div>
          <h1 className="text-center text-4xl font-bold my-8">Rides I Joined</h1>
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
                longDescr={`People: ${ride.num_riders_needed}`}
                imgsrc="https://th.bing.com/th/id/OIP.XVeIdoKEIK7SXK6yN3hEOQHaGs?w=185&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                imgalt="Cute airplane clipart">
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
