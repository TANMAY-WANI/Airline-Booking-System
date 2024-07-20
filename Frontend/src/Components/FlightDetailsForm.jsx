import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

const FlightDetailsForm = () => {
  const [flightDetails, setFlightDetails] = useState({
    src: '',
    dest: '',
    departure: '',
    arrival: '',
    eco: '',
    buisness: '',
    price_eco: '',
    price_buisness: '',
  });
  const [successAlert,setAlert] = useState(false);
  const [warningAlert,setWarningAlert] = useState(false)
  useEffect(()=>{
    let timer;
    if (successAlert){
      timer = setTimeout(()=>{
        setAlert(false)
      },2000)
    }

    return ()=>clearTimeout(timer)
  },[successAlert])
  useEffect(()=>{
    let time;
    if (warningAlert){
      time = setTimeout(()=>{
        setWarningAlert(false);
      },2000)
    }
  },[warningAlert])

  const handleChange = (e) => {
    setFlightDetails({
      ...flightDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(flightDetails);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    };
    axios.post("http://13.126.141.148/api/flights/add",flightDetails,{headers})
    .then((res)=>{
      setAlert(true);
    })
    .catch((err)=>{
      setWarningAlert(true)
    })
  };

  return (
    <>
               {
            successAlert && <Alert severity="success">Successfully added the flight</Alert>
          }
          {
            warningAlert && <Alert severity="error">Failed Adding the flight due to some issue. Try again in some time</Alert>
          }
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">Enter Flight Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Source</label>
              <input
                type="text"
                name="src"
                value={flightDetails.src}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Destination</label>
              <input
                type="text"
                name="dest"
                value={flightDetails.dest}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Departure Date & Time</label>
              <input
                type="datetime-local"
                name="departure"
                value={flightDetails.departure}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Arrival Date & Time</label>
              <input
                type="datetime-local"
                name="arrival"
                value={flightDetails.arrival}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Number of Economy Seats</label>
              <input
                type="number"
                name="eco"
                value={flightDetails.eco}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Number of Business Seats</label>
              <input
                type="number"
                name="buisness"
                value={flightDetails.buisness}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Price of Economy Seat</label>
              <input
                type="number"
                name="price_eco"
                value={flightDetails.price_eco}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Price of Business Seat</label>
              <input
                type="number"
                name="price_buisness"
                value={flightDetails.price_buisness}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default FlightDetailsForm;
