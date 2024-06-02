import React, { useState, useEffect } from 'react';
import CardView from '../components/CardView.jsx';

const Split = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/riderequests');
        const data = await response.json();
        console.log('Fetched data:', data); // Log the data fetched from the server
        setRequests(data);
      } catch (error) {
        console.error('Error fetching ride requests:', error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-black dark:text-white" style={{ marginTop: "5%", marginBottom: "5%", fontWeight: "500", fontSize: 45 }}>
        Ride Share Posts
      </h1>
      <div className="grid grid-cols-1 gap-4">
        {requests.map((request, index) => (
          <CardView
            key={index}
            header={request.initiator_name}
            shortDescr={`Pickup: ${request.pickup_point}, Dropoff: ${request.dropoff_point}, Time: ${request.pickup_time}`}
            longDescr={`Number of people: ${request.num_riders_needed}`}
            imgsrc="https://th.bing.com/th/id/OIP.XVeIdoKEIK7SXK6yN3hEOQHaGs?w=185&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            imgalt="Cute airplane clipart"
          />
        ))}
      </div>
    </div>
  );
};

export default Split;
