import './App.css'
import {Route, Routes} from "react-router-dom";
import OurDrinks from './pages/OurDrinks';
import Layout from './Layout';
import Homepage from './pages/Homepage';
import ResConfirm from './pages/ResConfirm';
import CheckRes from './pages/CheckRes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/ourDrinks" element={<OurDrinks />} />
        <Route path="/reservationConfirmed" element={<ResConfirm />} />
        <Route path="/checkReservation" element={<CheckRes />}/>
      </Route>
    </Routes>
  )
}

export default App
