import { useContext, useEffect, useState } from 'react';
import { AuthContext, TabContext } from '../App.jsx';

//need to check if user is logged in

const RideRequests = () => {
    const [initiatorName, setName] = useState('');
    const [pickup, setPickup] = useState('Select a Pickup Point');
    const [dropoff, setDropoff] = useState('Select a Terminal');
    const [pickupTime, setTime] = useState('');
    const [pickupDate, setDate] = useState('');
    const [numRiders, setRiders] = useState('');
    const [uberlyft, setUberOrLyft] = useState('Select a Preference');
    const [payment, setPayment] = useState("Select a Payment Method");
    const [statusMessage, setstatusMessage] = useState('')
    const [success, setSuccess] = useState(false);
    const { auth, setAuth } = useContext(AuthContext);
    const { tab, setTab } = useContext(TabContext);

    const handlePickup = (event) => {
        setPickup(event.target.value);
    };

    const handleDropoff = (event) => {
        setDropoff(event.target.value);
    };

    const handlePayment = (event) => {
        setPayment(event.target.value);
    }

    const handleRide = (event) => {
        setUberOrLyft(event.target.value);
    }

    const getUserInfo = async() => {

    try {
        const userInfo = await fetch("http://localhost:3000/auth/user", {
        method: "POST",
        credentials: "include",
        header: { "content-type": "application/json" },
        body: JSON.stringify({ token: auth.token }),
      })
        .then((data) => data.json())
        .then((data) => {
          setName(data.acc.fullname)
        });
        } catch (error) {
            console.error("Error fetching ride requests:", error);
        }
    }

    useEffect(() => {
        getUserInfo();
      }, []);

    const attemptRideRequest = async () => {
        console.log({initiator_name: initiatorName, pickup_point: pickup, dropoff_point: dropoff, pickup_time: pickupTime, num_riders_needed: numRiders, uber_or_lyft: uberlyft,
            payment_method: payment})
        if (!initiatorName || 
            pickup === 'Select a Pickup Point' || 
            dropoff === 'Select a Terminal' || 
            !pickupTime || 
            !numRiders || 
            uberlyft === "Select a Preference" || 
            payment === "Select a Payment Method") {
                setstatusMessage("Please fill out all fields.");
                return;
            }
        const res = await fetch('http://localhost:3000/auth/riderequests', {
            method: 'POST',
            credentials: 'include',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({initiator_name: initiatorName, pickup_point: pickup, dropoff_point: dropoff, pickup_date: pickupDate, pickup_time: pickupTime, num_riders_needed: numRiders, uber_or_lyft: uberlyft,
                payment_method: payment, token: auth.token})
        });
        if(res.ok) {
            const json = await res.json();
            console.log(json);
            console.log("success ride request");
            setSuccess(true);
        } else {
            const json = await res.json();
            console.log("request failed");
            setstatusMessage("Failed to create post.")
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
            Create a Ride Request
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
                <option disabled value="Select a Pickup Point">Select a Pickup Point</option>
                <option value="Dykstra Turnaround">Dykstra</option>
                <option value="Sproul Turnaround">Sproul</option>
                <option value="Rieber Turnaround">Rieber</option>
                <option value="Hedrick Turnaround">Hedrick</option>
            </select>
            </div>
            <div className="flex mb-6 items-center justify-center">
            <select value={dropoff} onChange={handleDropoff} className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled value="Select a Terminal">Select a Terminal</option>
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
            <select value={payment} onChange={handlePayment} className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled value="Select a Payment Method">Select a Payment Method</option>
                <option value="Venmo">Venmo</option>
                <option value="Zelle">Zelle</option>
                <option value="PayPal">PayPal</option>
                <option value="No Preference">No Preference</option>
            </select>
            </div>
            <div className="flex mb-6 items-center justify-center">
            <select value={uberlyft} onChange={handleRide} className="block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled value="Select a Preference">Select a Preference</option>
                <option value="Uber">Uber</option>
                <option value="Lyft">Lyft</option>
                <option value="No Preference">No Preference</option>
            </select>
            </div>
            <div className="flex mb-6 items-center justify-center">
            <button onClick={attemptRideRequest} className="block text-white p-4 rounded-lg bg-indigo-500 dark:bg-slate-500 hover:bg-indigo-600 dark:hover:bg-slate-600 active:bg-indigo-900 dark:active:bg-slate-900" style={{fontSize: 25, fontWeight: 200}}>Post</button>
          </div>
          {statusMessage && (
            <div className="flex items-center justify-center mt-4">
              <div className="max-w-s p-2 bg-red-200 text-red-700 border border-red-400 rounded">
                {statusMessage}
              </div>
            </div> )}

            {success && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="relative bg-white p-10 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-semibold">Post successfully created!</p>
                        <button
                            onClick={() => setTab(0)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>)}
        </div>
    )
};

export default RideRequests;
