import React, { useState, useEffect } from 'react';
import CardView from '../components/CardView.jsx';

const Split = () => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    pickup: '',
    dropoff: '',
    name: '',
    riders: '',
    date: '',
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

  const toTwelveHour = (time) => {
    const i = time.indexOf(':');
    var period = "AM";
    var hour = parseInt(time.substring(0, i));
    if (hour >= 13) {
      hour -= 12;
      period = "PM"
    }
    const min = parseInt(time.substring(i+1)); 
    console.log(`${hour}:${min} ${period}`);
    return `${hour}:${min} ${period}`;
  }

  const toTwentyFourHour = (time) => {
    if (filters.period == 'AM') return time;
     
    const i = time.indexOf(':');
    const hour = parseInt(time.substring(0, i)) + 12;
    const min = parseInt(time.substring(i+1));
    return `${hour}:${min}`;
  }

  const toMinutes = (time) => {
    const i = time.indexOf(':');
    const hour = parseInt(time.substring(0, i));
    const min = parseInt(time.substring(i+1));
    return hour * 60 + min;
  }

  // Filter requests based on selected criteria
  var filteredRequests = requests.filter(request => 
    (filters.pickup === '' || request.pickup_point.toLowerCase().includes(filters.pickup.toLowerCase())) &&
    (filters.dropoff === '' || request.dropoff_point.toLowerCase().includes(filters.dropoff.toLowerCase())) &&
    (filters.name === '' || request.initiator_name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (filters.riders === '' || request.num_riders_needed.toString() === filters.riders) &&
    (filters.date === '' || (request.pickup_date && request.pickup_date.includes(filters.date)))
  );
  console.log(filteredRequests);

  const filteredRequestsTimes = requests.filter(request => {
    if (filters.time === '') return true;
    console.log(filters.time);
    const filtTime = toMinutes(toTwentyFourHour(filters.time));
    console.log(filtTime);
    console.log(toMinutes(request.pickup_time));
    if (filtTime >= toMinutes(request.pickup_time) - 30 && 
    filtTime <= toMinutes(request.pickup_time) + 30) 
      return true;
  });


  console.log(filteredRequestsTimes);

  const filteredArray = filteredRequests.filter(value => filteredRequestsTimes.includes(value));
  console.log("filtered array");
  console.log(filteredArray);

  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-8 text-black dark:text-white">Ride Share Posts</h1>
      
      {/* Filter options */}
      <div className="text-center mb-4">
        <h2 className="text-2xl mb-4 text-black dark:text-white">Filters</h2>
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
              placeholder="Ex: Joe Bruin"
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
            <span className="mb-2 font-medium text-gray-300">Date:</span>
            <input
              type="text"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              placeholder="Ex: 2024-06-05"
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
        {/* {filteredRequests.map((request, index) => ( */}
        {filteredArray.map((request, index) => (
          <CardView
            key={index}
            header={request.initiator_name}
            shortDescr1={`Pickup: ${request.pickup_point}`}
            shortDescr2={`Dropoff: ${request.dropoff_point}`}
            shortDescr3={`Date: ${request.pickup_date}`}
            shortDescr4={`Time: ${toTwelveHour(request.pickup_time)}`}
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
