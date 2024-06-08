import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App.jsx";
import FriendCardView from "../components/FriendCardView.jsx";

const Buddies = () => {
  const [currentFriends, setCurrentFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [newFriendUsername, setNewFriendUsername] = useState('');
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await handleFriendRequests();
      await retrieveFriends();
    };
    fetchData();
  }, []);

  const retrieveFriends = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/get_friends", {
        method: "GET",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      const friends = data.friends;
  
      const formattedFriends = friends.map((friend) => ({
        name: friend
      }));
      setCurrentFriends(formattedFriends);
    } catch (error) {
      console.error("Error retrieving friends:", error);
    }
  };

  const acceptFriend = async (FriendName) => {
    try {
      const res = await fetch('http://localhost:3000/auth/accept_friend_request', {
        method: 'PUT',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ token: auth.token, acceptedFriendUsername: FriendName })
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
        await handleFriendRequests();
        await retrieveFriends();
      } else {
        console.error("Failed to accept friend request");
      }
    } catch (error) {
      console.error(`Error accepting friend request from ${FriendName}:`, error);
    }
  };

  const handleAddFriend = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/send_friend_request', {
        method: 'PUT',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ token: auth.token, requestedFriendUsername: newFriendUsername })
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
      } else {
        console.error("Failed to send friend request");
      }
      await handleFriendRequests();
      setNewFriendUsername('');
    } catch (error) {
      console.error(`Error sending friend request to ${newFriendUsername}:`, error);
    }
  };

  const handleFriendRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/get_friend_requests", {
        method: "GET",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      const friendRequests = data.friendRequests;
      const formattedRequests = friendRequests.map(name => ({
        name,
        details: "wants to become a friend!"
      }));
      setPendingRequests(formattedRequests);
    } catch (error) {
      console.error("Error handling friend requests:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-white p-4">
      <div className="text-center mb-8">
      <h1 className="text-2xl text-black dark:text-white"
            style={{
              marginTop: "5%",
              marginBottom: "3%",
              fontWeight: "500",
              fontSize: 45,
            }}
            >
            Send Friend Request
            </h1>
        <div className="mt-10 flex justify-center items-center">
          <input
            type="text"
            placeholder="Enter username to add"
            value={newFriendUsername}
            onChange={(e) => setNewFriendUsername(e.target.value)}
            className="h-12 p-2 rounded-l-lg text-black"
          />
          <button
            onClick={handleAddFriend}
            className="text-white p-4 h-12 flex items-center justify-center rounded-r-lg bg-indigo-500 dark:bg-slate-500 hover:bg-indigo-600 dark:hover:bg-slate-600 transition-colors duration-150 active:bg-indigo-900 dark:active:bg-slate-900 text-xl font-extralight"
          >
            Add Friend
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h1 className="text-center text-4xl font-bold my-8">Current Friends</h1>
          <div className="grid grid-cols-1 gap-4">
            {currentFriends.map((friend, index) => (
              <FriendCardView
                key={index}
                shortDescr3={friend.name}
                shortDescr1={friend.details}
                imgsrc="https://static.vecteezy.com/system/resources/thumbnails/007/166/503/small/best-friend-hands-up-icon-in-trendy-style-vector.jpg"
                imgalt="Friend avatar"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-center text-4xl font-bold my-8">Pending Requests</h1>
          <div className="grid grid-cols-1 gap-4">
            {pendingRequests.map((request, index) => (
              <FriendCardView
                key={index}
                header={request.name}
                shortDescr1={request.details}
                imgsrc="https://t4.ftcdn.net/jpg/06/11/95/11/360_F_611951140_r0RtdAxHVF0L9VzEnSex3bpDamDywXcT.jpg"
                imgalt="Requester avatar"
              >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => acceptFriend(request.name)}>
                  Accept
                </button>
              </FriendCardView>
            ))}
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Buddies;