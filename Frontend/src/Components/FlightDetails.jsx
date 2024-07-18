import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FlightDetails = ({ flights }) => {
  const [selectedSeat, setSelectedSeat] = useState('Economy');
  const navigate = useNavigate();
  const handleSeatChange = (seat) => {
    setSelectedSeat(seat);
  };

  const handleBookFlight = (flight) => {

    // console.log(`Booking flight ${flight._id} - Seat: ${selectedSeat}`);
    navigate("/add-passengers",{state:{flight:flight}})

  };

  return (
    <div className="max-w-screen-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-4">
      {flights.map((flight) => (
        <div key={flight._id} className="flex flex-col md:flex-row items-start justify-start mb-4">
          <div className="w-full md:w-1/5">
            <p className="text-gray-800 font-semibold">Source</p>
            <p className="text-blue-600">{flight.src}</p>
          </div>
          <div className="w-full md:w-1/5">
            <p className="text-gray-800 font-semibold">Destination</p>
            <p className="text-blue-600">{flight.dest}</p>
          </div>
          <div className="w-full md:w-1/5">
            <p className="text-gray-800 font-semibold">Departure</p>
            <p>{new Date(flight.departure).toLocaleString()}</p>
          </div>
          <div className="w-full md:w-1/5">
            <p className="text-gray-800 font-semibold">Arrival</p>
            <p>{new Date(flight.arrival).toLocaleString()}</p>
          </div>
          <div className="w-full md:w-1/5">
            <p className="text-gray-800 font-semibold">Seats</p>
            <div className="flex items-center space-x-2">
              <select
                className="px-3 py-1 rounded-lg focus:outline-none"
                value={selectedSeat}
                onChange={(e) => handleSeatChange(e.target.value)}
              >
                <option value="Economy">Economy</option>
                <option value="Buisness">Business</option>
              </select>
            </div>
            <p className="mt-2">{`Cost: ${flight.price[selectedSeat] !== undefined ? flight.price[selectedSeat] + ' INR' : ''}`}</p>
          </div>
          <div className="w-full md:w-auto flex items-center justify-center mt-4 md:mt-0">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              onClick={() => handleBookFlight(flight)}
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightDetails;
