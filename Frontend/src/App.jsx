import LandingPage from "./Pages/LandingPage"
import SearchFlights from "./Pages/SearchFlights"
import AddPassengers from "./Pages/AddPassengers"
import Payments from "./Pages/Payments"
import Ticket from "./Pages/Ticket"
import AddFlights from "./Pages/AddFlights"
import PrivateRoute from "./Components/PrivateRoute"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/searchFlight" element={<PrivateRoute element={<SearchFlights />} />} />
        <Route path="/add-passengers" element={<PrivateRoute element={<AddPassengers />} />} />
        <Route path="/payments" element={<PrivateRoute element={<Payments />} />} />
        <Route path="/tickets" element={<PrivateRoute element={<Ticket />} />} />
        <Route path="/addFlights" element={<PrivateRoute element={<AddFlights />} requiredRole="staff" />} />
        <Route path="*" element={<PrivateRoute element={<div />} urlType = "Error"/>} />
      </Routes>
    </Router>
  </>
  )
}

export default App
