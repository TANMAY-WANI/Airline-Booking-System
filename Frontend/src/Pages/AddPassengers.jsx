import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Layout from '../Components/Layout';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Alert } from '@mui/material';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AddPassengers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [flight, setFlight] = useState(null);
  const [isBookingFailed, setBookingFailed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      let isTokenExpired = false;
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          throw new Error("Invalid token format");
        }
        const payload = JSON.parse(atob(tokenParts[1]));
        const tokenExp = payload.exp * 1000;
        isTokenExpired = Date.now() > tokenExp;
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("staff")
        location.reload();
      }
      if (isTokenExpired) {
        localStorage.removeItem('token');
        localStorage.removeItem("staff")
        location.reload();
      }
    }

    if (location.state && location.state.flight) {
      setFlight(location.state.flight);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  const [passengers, setPassengers] = useState([{ name: '', contact: '', age: '', gender: '', seatType: '' }]);

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: '', contact: '', age: '', gender: '', seatType: '' }]);
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

  const proceedToPay = () => {
    const noOfPassengers = passengers.length;
    const obj = {
      "passenger_details": passengers,
      "flightID": flight._id
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    };
    axios.post("http://65.1.136.63/api/bookings/proceed-to-pay", obj, { headers })
      .then((res) => {
        const state = {
          'tempId': res.data["tempId"],
          "cost": res.data["cost"],
          "noOfPassengers": noOfPassengers,
          "flight": flight
        };
        navigate("/payments", { state: state });
      }).catch((err) => {
        setBookingFailed(true)
      });
  };

  if (!flight) {
    return null; 
  }

  return (
    <>
      <Header />
      <Layout>
        {
          isBookingFailed && <Alert severity="error">There was some error is processing your request</Alert>
        }
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
                    <MenuItem value="Buisness">Business - ₹{flight.price.Buisness}/-</MenuItem>
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
