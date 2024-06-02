import React, { useState, useEffect } from 'react';
import CardView from '../components/CardView.jsx';

const Split = () => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    pickup: '',
    dropoff: '',
    name: '',
    riders: '',
    time: '',
    period: 'AM'
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

  const handlePeriodChange = (event) => {
    setFilters({
      ...filters,
      period: event.target.value
    });
  };

  // Filter requests based on selected criteria
  const filteredRequests = requests.filter(request => 
    (filters.pickup === '' || request.pickup_point.toLowerCase().includes(filters.pickup.toLowerCase())) &&
    (filters.dropoff === '' || request.dropoff_point.toLowerCase().includes(filters.dropoff.toLowerCase())) &&
    (filters.name === '' || request.initiator_name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (filters.riders === '' || request.num_riders_needed.toString() === filters.riders) &&
    (filters.time === '' || request.pickup_time.toLowerCase().includes((filters.time + ' ' + filters.period).toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-center text-4xl font-bold my-8">Ride Share Posts</h1>
      
      {/* Filter options */}
      <div className="text-center mb-4">
        <h2 className="text-2xl mb-4">Filters</h2>
        <div className="flex justify-center flex-wrap space-x-4">
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-gray-300">Pickup Point:</span>
            <input
              type="text"
              name="pickup"
              value={filters.pickup}
              onChange={handleFilterChange}
              placeholder="Ex: Dykstra Turnaround"
              className="p-2 border border-gray-300 rounded text-black"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-gray-300">Dropoff Point:</span>
            <input
              type="text"
              name="dropoff"
              value={filters.dropoff}
              onChange={handleFilterChange}
              placeholder="Ex: Terminal 1"
              className="p-2 border border-gray-300 rounded text-black"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-gray-300">Person's Name:</span>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Ex: Pranav"
              className="p-2 border border-gray-300 rounded text-black"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-gray-300">Number of Riders:</span>
            <input
              type="text"
              name="riders"
              value={filters.riders}
              onChange={handleFilterChange}
              placeholder="Ex: 3"
              className="p-2 border border-gray-300 rounded text-black"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-gray-300">Pickup Time:</span>
            <div className="flex space-x-2">
              <input
                type="text"
                name="time"
                value={filters.time}
                onChange={handleFilterChange}
                placeholder="Ex: 3:20"
                className="p-2 border border-gray-300 rounded text-black"
              />
              <select
                name="period"
                value={filters.period}
                onChange={handlePeriodChange}
                className="p-2 border border-gray-300 rounded text-black"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </label>
        </div>
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
