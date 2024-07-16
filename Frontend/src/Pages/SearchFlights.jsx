import React, { useState } from 'react'
import Header from '../Components/Header'
import FlightDetails from '../Components/FlightDetails'
import axios from 'axios'
const SearchFlights = () => {

  const [src,setSrc] = useState("")
  const [dest,setDest] = useState("")
  const [date_of_travel,setDate] = useState("")
  const [flights,setFlights] = useState([])

  const handleSearch = () => {
    event.preventDefault()
    const obj = {
      src,
      dest,
      date_of_travel
    }
    console.log(obj);
    const token = localStorage.getItem("token")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    axios.post("http://localhost:5001/api/flights/search",obj,{headers})
    .then((res)=>{
      console.log(res.data);
      setFlights(res.data)
    }).catch((err)=>{
      console.log(err.message)
    })
  }
  return (
    <>
      <Header />
      <div className="mt-14 py-4  bg-cover bg-center bg-no-repeat h-[93vh] w-full">
        <div className="max-w-screen-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-4">
          <form className="flex items-center justify-center space-x-4 w-full">
            <input
              type="text"
              placeholder="Source"
              className="flex-1 appearance-none rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(event)=>{setSrc(event.target.value)}}
            />
            <input
              type="text"
              placeholder="Destination"
              className="flex-1 appearance-none rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(event)=>{setDest(event.target.value)}}
            />
            <input
              type="date"
              className="flex-1 appearance-none rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(event)=>{setDate(event.target.value)}}
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
          flights.length!=0 &&
          <FlightDetails flights={flights}/>
        }
      </div>
    </>

  )
}

export default SearchFlights