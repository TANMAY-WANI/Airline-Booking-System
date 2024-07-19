import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import FlightDetails from '../Components/FlightDetails'
import Layout from '../Components/Layout'
import axios from 'axios'
import { Alert } from '@mui/material'
const SearchFlights = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const tokenExp = payload.exp * 1000;
      const isTokenExpired = Date.now() > tokenExp;

      if (isTokenExpired) {
        localStorage.removeItem('token');
        localStorage.removeItem("staff")
        location.reload()
      }
    }
  }, [])

  const [src, setSrc] = useState("")
  const [dest, setDest] = useState("")
  const [date_of_travel, setDate] = useState("")
  const [flights, setFlights] = useState([])
  const [noFlightsFound, setNoFlights] = useState(false)

  const handleSearch = () => {

    event.preventDefault()
    const obj = {
      src,
      dest,
      date_of_travel
    }
    const token = localStorage.getItem("token")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    axios.post("http://13.126.141.148:5001/api/flights/search", obj, { headers })
      .then((res) => {
        setFlights(res.data)
      }).catch((err) => {
        setNoFlights(true)
      })
  }
  return (
    <>
      <Header />
      <Layout>
        {
          noFlightsFound && <Alert severity="info">There are no flights for the given route. Sorry for inconvinence caused.</Alert>
        }
        <div className="max-w-screen-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-4">
          <form className="flex items-center justify-center space-x-4 w-full">
            <input
              type="text"
              placeholder="Source"
              className="flex-1 appearance-none rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(event) => { setSrc(event.target.value) }}
            />
            <input
              type="text"
              placeholder="Destination"
              className="flex-1 appearance-none rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(event) => { setDest(event.target.value) }}
            />
            <input
              type="date"
              className="flex-1 appearance-none rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(event) => { setDate(event.target.value) }}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Search
            </button>
          </form>
        </div>
        {
          flights.length != 0 &&
          <FlightDetails flights={flights} />
        }
      </Layout>
    </>

  )
}

export default SearchFlights