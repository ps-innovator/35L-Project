import { useState, useEffect } from "react";
import CardView from "../components/CardView.jsx";

const Buddies = () => {
  const [currentFriends, setCurrentFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [newFriendUsername, setNewFriendUsername] = useState('');

  // Example data fetching, details don't have to be specified
  useEffect(() => {
    setCurrentFriends([
      { name: "FillerName", details: "Friend since 2020" },
      { name: "FillerName2", details: "Friend since 2019" },
    ]);
    setPendingRequests([
      { name: "FillerName", details: "Request received 2 days ago" },
      { name: "FillerName2", details: "Request received 1 week ago" },
    ]);
  }, []);

  //attached to search button
  const handleAddFriend = () => {
    console.log(`Sending friend request to ${newFriendUsername}`);
  };

return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-white p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Send Friend Request</h1>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Enter username to add"
            value={newFriendUsername}
            onChange={(e) => setNewFriendUsername(e.target.value)}
            className="p-2 rounded-l-lg text-black"
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
              <CardView
                key={index}
                header={friend.name}
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
              <CardView
                key={index}
                header={request.name}
                shortDescr1={request.details}
                imgsrc="https://t4.ftcdn.net/jpg/06/11/95/11/360_F_611951140_r0RtdAxHVF0L9VzEnSex3bpDamDywXcT.jpg"
                imgalt="Requester avatar"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Buddies;
