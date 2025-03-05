import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout(){
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <div className="flex-grow max-w-6xl mx-auto w-full">
            <Outlet />
            </div>

            <Footer />
        
        </div>
    );
}

export default Layout;