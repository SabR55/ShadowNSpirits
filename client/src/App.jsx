import './App.css'
import {Route, Routes} from "react-router-dom";
import Page1 from './pages/Page1';
import Layout from './Layout';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/page1" element={<Page1 />} />
      </Route>
    </Routes>
  )
}

export default App
