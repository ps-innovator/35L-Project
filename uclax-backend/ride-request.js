require('dotenv').config()

const populateRideRequest = async (initiator, pickup, dropoff, time, numRiders) => {
    return (
        { 
        "initiator-name": initiator,
        "pickup-point": pickup,
        "dropoff-point": dropoff,
        "pickup-time": time,
        "num-riders-needed": numRiders
        }
    );
}