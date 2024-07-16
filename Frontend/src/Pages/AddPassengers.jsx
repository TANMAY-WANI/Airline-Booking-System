import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Layout from '../Components/Layout';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// const flight = {
//     _id:"1010",
//   arrival: "2024-07-15T00:00:00.000Z",
//   departure: "2024-07-15T00:00:00.000Z",
//   dest: "Delhi",
//   noOfSeats: { Economy: 100, Buisness: 50 },
//   price: { Economy: 3000, Buisness: 9000 },
//   src: "Mumbai",
// };

const AddPassengers = () => {
    const location = useLocation()
    const {flight} = location.state;

  const [passengers, setPassengers] = useState([{ name: '', contact: '', age: '', gender: '', seatType: '' }]);

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: '', contact: '', age: '',gender: '', seatType: '' }]);
  };

  const handlePassengerChange = (index, event) => {
    const newPassengers = passengers.map((passenger, i) => {
      if (i === index) { 
        return { ...passenger, [event.target.name]: event.target.value };
      }
      return passenger;
    });
    setPassengers(newPassengers);
  };

  const proceedToPay = ()=>{
    // console.log(passengers.length);
    const obj = {
        "passenger_details":passengers,
        "flightID":flight._id
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      };
    axios.post("http://localhost:5001/api/bookings/proceed-to-pay",obj,{headers})
    .then((res)=>{
        localStorage.setItem("temp_bookingID",res.data['tempId']);
    }).catch((err)=>{
        console.log(err.message);
    })
  }
  return (
    <>
      <Header />
      <Layout>
        <div className="w-full h-full min-h-screen p-6">
          <h1 className="text-4xl font-semibold mb-4">Flight Booking</h1>
          <div className="mb-4 flex justify-between">
            <p className='text-xl'><strong>From:</strong> {flight.src}</p>
            <p className='text-xl'><strong>To:</strong> {flight.dest}</p>
            <p className='text-xl'><strong>Departure:</strong> {new Date(flight.departure).toLocaleString()}</p>
            <p className='text-xl'><strong>Arrival:</strong> {new Date(flight.arrival).toLocaleString()}</p>
          </div>

          {passengers.map((passenger, index) => (
            <div key={index} className="mb-4 p-4 bg-white rounded shadow-sm">
              <h2 className="text-xl font-medium mb-2">Passenger {index + 1}</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Name"
                  name="name"
                  value={passenger.name}
                  onChange={(e) => handlePassengerChange(index, e)}
                  fullWidth
                />
                <TextField
                  label="Phone"
                  name="contact"
                  value={passenger.contact}
                  onChange={(e) => handlePassengerChange(index, e)}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={passenger.gender}
                    onChange={(e) => handlePassengerChange(index, e)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(index, e)}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Seat Type</InputLabel>
                  <Select
                    name="seatType"
                    value={passenger.seatType}
                    onChange={(e) => handlePassengerChange(index, e)}
                  >
                    <MenuItem value="Economy">Economy - ₹{flight.price.Economy}/-</MenuItem>
                    <MenuItem value="Business">Business - ₹{flight.price.Buisness}/-</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
          ))}

          <div className="flex justify-between items-center mb-4">
            <IconButton onClick={handleAddPassenger} color="primary">
              <AddIcon />
            </IconButton>
            <Button variant="contained" color="primary" onClick={proceedToPay}> 
              Proceed to Pay
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddPassengers;
