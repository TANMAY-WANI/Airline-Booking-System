import LandingPage from "./Pages/LandingPage"
import SearchFlights from "./Pages/SearchFlights"
import AddPassengers from "./Pages/AddPassengers"
import Payments from "./Pages/Payments"
import Ticket from "./Pages/Ticket"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {

  const ticket = {
    _id: "6697f632be99fd476856c7f0",
    userID: "6690bfb11288de0c534ca1df",
    passenger_details: [
      {
        name: "Tanmay",
        contact: "9104332789",
        age: 21,
        gender: "male",
        seatType: "Buisness",
        _id: "6697f4489e8deb1263801cdc"
      },
      {
        name: "Tanmay",
        contact: "9104332789",
        age: 21,
        gender: "male",
        seatType: "Buisness",
        _id: "6697f4489e8deb1263801cde"
      },
      {
        name: "Tanmay",
        contact: "9104332789",
        age: 21,
        gender: "male",
        seatType: "Buisness",
        _id: "6697f4489e8deb1263801cdf"
      }
    ],
    flightID: "669501dc6f00df03029bf014",
    cost: 9000,
    __v: 0
  };
  
  const flight = {
    _id: "669501dc6f00df03029bf014",
    src: "Mumbai",
    dest: "Delhi",
    departure: 1721001600000,
    arrival: 1721001600000,
    __v: 0
  };
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/searchFlight" element={<SearchFlights/>} />
          <Route path="/add-passengers" element={<AddPassengers/>} />
          <Route path="/payments" element={<Payments/>} />
          <Route path="/tickets" element={<Ticket/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
