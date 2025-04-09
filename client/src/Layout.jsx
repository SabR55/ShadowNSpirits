import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout(){
    return(
        <div className="flex flex-col max-w-full min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-10">
                <Navbar />
            </div>
            
            
            <div 
                className="flex-grow  mx-auto w-full flex  justify-center" 
                // style={{backgroundColor:"#200B27"}}
                >
            <Outlet />
            </div>

            <Footer />
        
        </div>
    );
}

export default Layout;