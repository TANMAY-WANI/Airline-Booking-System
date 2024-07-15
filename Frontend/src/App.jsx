import LandingPage from "./Pages/LandingPage"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SearchFlights from "./Pages/SearchFlights"

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/searchFlight" element={<SearchFlights/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
