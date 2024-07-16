import LandingPage from "./Pages/LandingPage"
import SearchFlights from "./Pages/SearchFlights"
import AddPassengers from "./Pages/AddPassengers"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/searchFlight" element={<SearchFlights/>} />
          <Route path="/add-passengers" element={<AddPassengers/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
