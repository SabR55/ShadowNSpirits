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
        <div 
            className="pt-16 flex items-center justify-center bg-cover bg-center bg-no-repeat w-full" 
            style={{ backgroundImage: "url('/src/assets/Images/smoke-bgd.jpg')" }}>

            <div className="px-8 py-12 max-w-md w-80 bg-white">
                <div className="flex items-center justify-center">
                    <h2 id="resModalTitle" className="resModalTitle text-xl font-bold">Check Reservation</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="pt-8">
                        <input 
                        className="inputBox inputBoxEditing text-center"
                        placeholder="Reservation Number"
                        value={resNum}
                        onChange={e => setResNum(e.target.value)}
                        />
                    </div>
                    
                    {/* Error message if the Reservation Number enter is invalid */}
                    <div className="pt-2 inputLabel errorMsg text-center" style={{display: resNotFound ? "block" : "none" }}>
                        <a>Reservation number not found</a>
                    </div>

                    <div className="pt-4">
                        <button
                        className="formButton"
                        type="submit"
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