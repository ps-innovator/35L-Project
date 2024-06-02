import React, { useState, useEffect } from 'react';
import CardView from '../components/CardView.jsx';

const Split = () => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    pickup: '',
    dropoff: ''
  });

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

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  };

  // Filter requests based on selected criteria
  const filteredRequests = requests.filter(request => 
    (filters.pickup === '' || request.pickup_point.toLowerCase().includes(filters.pickup.toLowerCase())) &&
    (filters.dropoff === '' || request.dropoff_point.toLowerCase().includes(filters.dropoff.toLowerCase()))
  );

  return (
    <div>
      <h1 className="text-2xl text-black dark:text-white" style={{ marginTop: "5%", marginBottom: "5%", fontWeight: "500", fontSize: 45 }}>
        Ride Share Posts
      </h1>

      
      {/* Filter options */}
      <div className="flex flex-wrap mb-4 space-x-4">
        <label className="flex flex-col">
          <span className="mb-2 font-medium text-gray-700 dark:text-gray-300">Pickup Point:</span>
          <input
            type="text"
            name="pickup"
            value={filters.pickup}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-2 font-medium text-gray-700 dark:text-gray-300">Dropoff Point:</span>
          <input
            type="text"
            name="dropoff"
            value={filters.dropoff}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredRequests.map((request, index) => (
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
