import LandingPage from "./Pages/LandingPage"
import SearchFlights from "./Pages/SearchFlights"
import AddPassengers from "./Pages/AddPassengers"
import Payments from "./Pages/Payments"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/Home" element={<LandingPage/>} />

          <Route path="/searchFlight" element={<SearchFlights/>} />
          <Route path="/add-passengers" element={<AddPassengers/>} />
          <Route path="/payments" element={<Payments/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
