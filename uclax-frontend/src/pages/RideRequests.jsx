import { useState } from 'react';

//need to check if user is logged in

const RideRequests = () => {
    const [initiatorName, setName] = useState('');
    const [pickup, setPickup] = useState('Dykstra Turnaround');
    const [dropoff, setDropoff] = useState('Terminal 1');
    const [pickupTime, setTime] = useState('');
    const [pickupDate, setDate] = useState('');
    const [numRiders, setRiders] = useState('');



    const handlePickup = (event) => {
        setPickup(event.target.value);
    };

    const handleDropoff = (event) => {
        setDropoff(event.target.value);
    };

    const attemptRideRequest = async () => {
        console.log({initiator_name: initiatorName, pickup_point: pickup, dropoff_point: dropoff, pickup_time: pickupTime, num_riders_needed: numRiders})
        const res = await fetch('http://localhost:3000/auth/riderequests', {
            method: 'POST',
            credentials: 'include',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({initiator_name: initiatorName, pickup_point: pickup, dropoff_point: dropoff, pickup_date: pickupDate, pickup_time: pickupTime, num_riders_needed: numRiders})
        });
        if(res.ok) {
            const json = await res.json();
            console.log(json);
            console.log("success ride request");
        } else {
            const json = await res.json();
            console.log("request failed");
        }
    };

    return (
        <div>
            <h1 className="text-2xl text-black dark:text-white"
            style={{
              marginTop: "5%",
              marginBottom: "5%",
              fontWeight: "500",
              fontSize: 45,
            }}
            >
            Ride Requests
            </h1>
            <div className="flex mb-6 items-center justify-center">
            <input
                name="Initiator"
                placeholder="Requester Name"
                value={initiatorName}
                onChange={(e) => setName(e.target.value)}  
                className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
            </div>
            <div className="flex mb-6 items-center justify-center">
            <select value={pickup} onChange={handlePickup} className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="Dykstra Turnaround">Dykstra</option>
                <option value="Sproul Turnaround">Sproul</option>
                <option value="Rieber Turnaround">Rieber</option>
                <option value="Hedrick Turnaround">Hedrick</option>
            </select>
            </div>
            <div className="flex mb-6 items-center justify-center">
            <select value={dropoff} onChange={handleDropoff} className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="Terminal 1">Terminal 1</option>
                <option value="Terminal 2">Terminal 2</option>
                <option value="Terminal 3">Terminal 3</option>
                <option value="Terminal 4">Terminal 4</option>
                <option value="Terminal 5">Terminal 5</option>
                <option value="Terminal 6">Terminal 6</option>
                <option value="Terminal 7">Terminal 7</option>
                <option value="Terminal 8">Terminal 8</option>
                <option value="Terminal 9">Terminal 9</option>
            </select>
            </div>
            <div className="flex mb-6 items-center justify-center">
            <input type="date" value={pickupDate} onChange={(e) => setDate(e.target.value)} className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            </div>
            <div className="flex mb-6 items-center justify-center">
            <input type="time" value={pickupTime} onChange={(e) => setTime(e.target.value)} className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            </div>
            <div className="flex mb-6 items-center justify-center">
            <input
                name="Number of Riders"
                placeholder="0"
                value={numRiders}
                onChange={(e) => setRiders(e.target.value)}  
                className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
            </div>
            <div className="flex mb-6 items-center justify-center">
            <button onClick={attemptRideRequest} className="block text-white p-4 rounded-lg bg-indigo-500 dark:bg-slate-500 hover:bg-indigo-600 dark:hover:bg-slate-600 active:bg-indigo-900 dark:active:bg-slate-900" style={{fontSize: 25, fontWeight: 200}}>Sign Up</button>
          </div>
        </div>
    )
};

export default RideRequests;