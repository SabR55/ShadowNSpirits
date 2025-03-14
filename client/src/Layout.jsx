import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout(){
    return(
        <div className="flex flex-col min-h-screen" style={{backgroundColor:"#361241"}}>
            <div className="fixed top-0 left-0 right-0">
                <Navbar />
            </div>
            
            
            <div 
                className="flex-grow max-w-6xl mx-auto w-full flex items-center justify-center" 
                style={{marginTop:"3.5rem", backgroundColor:"#361241"}}>
            <Outlet />
            </div>

            <Footer />
        
        </div>
    );
}

export default Layout;