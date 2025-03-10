import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReservationBtn from "../ReservationBtn";


function CheckRes(){
    const [resNum, setResNum] = useState('');

    const [resNotFound, setResNotFound] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        
        e.preventDefault()

        try {
            // Check if the reservation exists
            const response = await axios.get(`/reservation-details/${resNum}`);

            console.log("Call #1");

            // Redirect to the details page
            navigate(`/reservation-details/${resNum}`);
            
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setResNotFound(true);
                setResNum('');
                setError('Reservation not found.');
            } else {
                // Handle other errors
                setError('An error occurred. Please try again later.');
                console.error('Error checking reservation:', err);
            }
        }

    }

    return(
        <div className="flex items-center justify-center">
            <div className="rounded-lg px-8 py-12 max-w-md w-80 bg-white">
                <div className="flex items-center justify-center">
                    <h2 id="resModalTitle" className="text-xl font-bold">Check Reservation</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="pt-8">
                         <input 
                        className="w-full px-3 py-2 text-center border border-gray-300 rounded-md"
                        placeholder="Reservation Number"
                        value={resNum}
                        onChange={e => setResNum(e.target.value)}
                        />
                    </div>
                    
                    {/* Error message if the Reservation Number enter is invalid */}
                    <div className="pt-2 block text-sm font-medium text-center text-gray-700 mb-1" style={{ color:"#C70039", display: resNotFound ? "block" : "none" }}>
                        <a>Reservation number not found</a>
                    </div>

                    <div className="pt-4">
                        <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                        style={{backgroundColor:'#441752', color:'white'}}
                        >
                        Confirm Reservation
                        </button>
                    </div>

                </form>
            </div>

            <div id="reservationBtn" className="fixed z-10">
                <ReservationBtn />
            </div>
        </div>
    );
}

export default CheckRes;