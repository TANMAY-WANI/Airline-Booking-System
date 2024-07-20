import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import Header from '../Components/Header';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {Alert} from '@mui/material';
import axios from 'axios';

const Payments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [saveCard,setSaveCard] = useState(false)
  const [isBookingFailed,setFalied] = useState(false)
  const [card, setCard] = useState({
    card_number: '',
    holder_name: '',
    cvv: '',
    expiry: '',
  });
  const [bookingDetails, setBookingDetails] = useState(null);

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

    if (location.state && location.state.tempId && location.state.cost && location.state.noOfPassengers && location.state.flight) {
      setBookingDetails(location.state);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    };
    axios.get("http://65.1.136.63/pay/get-card-details", { headers }).then((res) => {
      const cardDetails = res.data;
      setCard({
        card_number: cardDetails.card_number || '',
        holder_name: cardDetails.holder_name || '',
        cvv: cardDetails.cvv || '',
        expiry: cardDetails.expiry || '',
      });
    }).catch((err) => {
      // do nothing
    });
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCard((prevCard) => ({
      ...prevCard,
      [id]: value,
    }));
  };



  if (!bookingDetails) {
    return null;
  }

  const { tempId, cost, noOfPassengers, flight } = bookingDetails;

  const handleSubmit = (event) => {
    event.preventDefault();
    const obj = {
        "tempBookingID":tempId,
        "cardDetails":card,
        "flag":saveCard
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      };
    axios.post("http://65.1.136.63/pay/bookings/pay-now",obj,{headers})
    .then((res)=>{
        navigate("/tickets",{state:{flight:flight,ticket:res.data}})
    }).catch((err)=>{
        // console.log(err);
        setFalied(true)
    })

  };

  return (
    <>
      <Header />
      <Layout>
      {
          isBookingFailed && <Alert severity="error">There was some error is processing your request</Alert>
        }
        <div className="w-full h-full min-h-screen p-6">
          <h1 className="text-2xl text-center font-semibold mb-4">Booking Summary</h1>
          <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-4 mx-auto max-w-4xl px-4 shadow-lg rounded-lg bg-white">
            <div className="text-xl text-center">
              <p><strong>From</strong></p>
              <p>{flight.src}</p>
            </div>
            <div className="text-xl text-center">
              <p><strong>To</strong></p>
              <p>{flight.dest}</p>
            </div>
            <div className="text-xl text-center">
              <p><strong>Departure:</strong></p>
              <p>{new Date(flight.departure).toLocaleString()}</p>
            </div>
            <div className="text-xl text-center">
              <p><strong>Arrival</strong></p>
              <p>{new Date(flight.arrival).toLocaleString()}</p>
            </div>
            <div className="text-xl text-center">
              <p><strong>No of Passengers</strong></p>
              <p>{noOfPassengers}</p>
            </div>
            <div className="text-xl text-center">
              <p><strong>Cost</strong></p>
              <p>{cost}</p>
            </div>
          </div>
          <h1 className="text-2xl text-center font-semibold mb-4">Card Details</h1>

          <Box
            sx={{
              maxWidth: ['100%', '100%', '400px'], // responsive widths for different screen sizes
              mx: 'auto',
              p: 4,
              bg: 'white',
              boxShadow: 1,
              borderRadius: 2,
            }}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <TextField
                id="card_number"
                label="Card Number"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 16 }}
                value={card.card_number}
                onChange={handleChange}
              />
              <TextField
                id="holder_name"
                label="Holder Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={card.holder_name}
                onChange={handleChange}
              />
              <TextField
                id="cvv"
                label="CVV"
                variant="outlined"
                fullWidth
                type="password"
                sx={{ mb: 2 }}
                inputProps={{ maxLength: 3 }}
                value={card.cvv}
                onChange={handleChange}
              />

              <TextField
                id="expiry"
                label="Expiry Date"
                variant="outlined"
                placeholder='MM/YY'
                fullWidth
                value={card.expiry}
                onChange={handleChange}
                inputProps={{
                  maxLength: 5,
                  pattern: '(0[1-9]|1[0-2])\/([0-9]{2})',
                }}
              />

<FormControlLabel
  control={
    <Checkbox
      checked={saveCard}
      onChange={(e) => setSaveCard(e.target.checked)}
      name="saveCard"
      color="primary"
    />
  }
  label="Remember Me"
/>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  py: 1.5,
                  mt: 2,
                  bgcolor: 'blue.500',
                  ':hover': {
                    bgcolor: 'blue.600',
                  },
                }}
              >
                Pay Now
              </Button>
            </form>
          </Box>
        </div>
      </Layout>
    </>
  );
};

export default Payments;
