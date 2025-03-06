import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReservationBtn from "./ReservationBtn";

function Layout(){
    return(
        <div className="flex flex-col min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-10">
                <Navbar />
            </div>
            
            
            <div className="flex-grow max-w-6xl mx-auto w-full">
            <Outlet />
            </div>

            <div id="reservationBtn" className="fixed z-10">
                <ReservationBtn />
            </div>

            <Footer />
        
        </div>
    );
}

export default Layout;