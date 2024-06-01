import { useState } from 'react';

//need to check if user is logged in

const RideRequests = () => {
    const [initiatorName, setName] = useState('');
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [pickupTime, setTime] = useState('');
    const [numRiders, setRiders] = useState('');



    const handlePickup = (event) => {
        setPickup(event.target.value);
    };

    const handleDropoff = (event) => {
        setDropoff(event.target.value);
    };

    const attemptRideRequest = async () => {
        console.log({initiator_name: initiatorName, pickup_point: pickup, dropoff_point: dropoff, pickup_time: pickupTime, num_riders_needed: numRiders})
        const res = await fetch('http://localhost:3000/riderequests', {
            method: 'POST',
            credentials: 'include',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({initiator_name: initiatorName, pickup_point: pickup, dropoff_point: dropoff, pickup_time: pickupTime, num_riders_needed: numRiders})
        });
        if(res.ok) {
            const json = await res.json();
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
            <div>
            <select value={pickup} onChange={handlePickup}>
                <option value="Dykstra Turnaround">Dykstra</option>
                <option value="Sproul Turnaround">Sproul</option>
                <option value="Rieber Turnaround">Rieber</option>
                <option value="Hedrick Turnaround">Hedrick</option>
            </select>
            </div>
            <div className="flex mb-6 items-center justify-center">
            <select value={dropoff} onChange={handleDropoff}>
                <option value="Terminal 1">T1</option>
                <option value="Terminal 2">T2</option>
                <option value="Terminal 3">T3</option>
                <option value="Terminal 4">T4</option>
                <option value="Terminal 5">T5</option>
                <option value="Terminal 6">T6</option>
                <option value="Terminal 7">T7</option>
                <option value="Terminal 8">T8</option>
                <option value="Terminal 9">T9</option>
            </select>
            </div>
            <div className="flex mb-6 items-center justify-center">
            <input
                name="Pickup Time"
                placeholder="3 PM"
                value={pickupTime}
                onChange={(e) => setTime(e.target.value)}  
                className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
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