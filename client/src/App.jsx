import './App.css'
import {Route, Routes} from "react-router-dom";
import OurDrinks from './pages/OurDrinks';
import Layout from './Layout';
import Homepage from './pages/Homepage';
import ResDetails from './pages/ResDetails';
import CheckRes from './pages/CheckRes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/ourDrinks" element={<OurDrinks />} />
        <Route path="/reservation-details" element={<ResDetails />} />
        <Route path="/reservation-details/:reservationNumber" element={<ResDetails />} />
        <Route path="/check-reservation" element={<CheckRes />}/>
      </Route>
    </Routes>
  )
}

export default App
