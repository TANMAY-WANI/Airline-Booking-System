import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Header from '../Components/Header';
import Layout from '../Components/Layout';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [flightDetails, setFlightDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [isAbsent,setAbsent] = useState(false)
  useEffect(()=>{
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
  },[])

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    };
    axios.get('http://65.1.136.63/api/bookings/display', { headers })
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        setAbsent(true)
      });
  }, []);

  const handleCloseModal = () => {
    setOpen(false);
    setFlightDetails(null); // Reset flight details when modal is closed
  };

  const handleCardClick = (flightID) => {
    const obj = {
      "flightID": flightID
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    };
    axios.post("http://65.1.136.63/api/flights/searchByID", obj, { headers })
      .then((res) => {
        setFlightDetails(res.data);
        setOpen(true);
      }).catch((err) => {
        handleCloseModal();
      });
  };

  return (
    <>
    <Header/>
    <Layout>
    <div className="container mx-auto p-4">
      {
        !isAbsent &&
        <>
        <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      {bookings.map(booking => (
        <div
          key={booking._id}
          className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 mb-4 cursor-pointer"
          onClick={() => handleCardClick(booking.flightID)}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Flight ID: {booking.flightID.slice(-4)}</h2>
            <div className="flex justify-between mb-4">
              <p className="text-sm">Passenger Count: {booking.passenger_details.length}</p>
              <p className="text-sm">Cost: ₹{booking.cost}</p>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-lg font-semibold mb-2">Passenger Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {booking.passenger_details.slice(0, 3).map((passenger, index) => (
                  <div key={passenger._id} className="mb-2">
                    <p className="text-sm"><span className="font-semibold">Name:</span> {passenger.name}</p>
                    <p className="text-sm"><span className="font-semibold">Contact:</span> {passenger.contact}</p>
                    <p className="text-sm"><span className="font-semibold">Age:</span> {passenger.age}</p>
                    <p className="text-sm"><span className="font-semibold">Gender:</span> {passenger.gender}</p>
                    <p className="text-sm"><span className="font-semibold">Seat Type:</span> {passenger.seatType}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
          <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-8 w-96">
        <h2 className="text-xl font-bold mb-4">Flight Details</h2>
        {flightDetails && (
          <div>
            <div className="mb-4">
              <p className="text-sm font-semibold">Source:</p>
              <p className="text-lg">{flightDetails.src}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold">Destination:</p>
              <p className="text-lg">{flightDetails.dest}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold">Departure:</p>
              <p className="text-lg">{new Date(flightDetails.departure).toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold">Arrival:</p>
              <p className="text-lg">{new Date(flightDetails.arrival).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
        </>
      }
      {
        isAbsent &&
        <h1 className="text-3xl font-bold mb-6">You have no bookings for now</h1>
      }
    </div>
    </Layout>
    </>
  );
};

export default UserBookings;
