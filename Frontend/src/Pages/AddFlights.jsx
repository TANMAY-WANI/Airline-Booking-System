import React, { useEffect } from 'react'
import Header from '../Components/Header'
import Layout from '../Components/Layout'
import FlightDetailsForm from '../Components/FlightDetailsForm'

const AddFlights = () => {

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
  return (
    <>
    <Header/>
    <Layout>
        <FlightDetailsForm/>
    </Layout>
    </>
  )
}

export default AddFlights