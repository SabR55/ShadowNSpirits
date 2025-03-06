import { useState } from "react";
import axios from "axios";


function CheckRes(){
    const [resNum, setResNum] = useState('');

    const handleSubmit = (e) => {
        // alert(resNum);
        
        e.preventDefault();

        axios.get('/test');

    }

    return(
        <div className="mt-24 flex items-center justify-center" >
            <div className="rounded-lg px-8 py-12 max-w-md w-full mx-4" style={{backgroundColor:"white"}}>
                <div className="flex items-center justify-center">
                <h2 id="resModalTitle" className="text-xl font-bold">Check Reservation</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="pt-10">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reservation Number
                        </label>
                        <input 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={resNum}
                        onChange={e => setResNum(e.target.value)}
                        />
                    </div>

                    {/* Error message if the Reservation Number enter is invalid */}
                    <div className="pt-4 block text-sm font-medium text-gray-700 mb-1" style={{display:"none"}}>
                        <a>Reservation number not found. <br/>Please check and try again.</a>
                    </div>

                    <div className="pt-10">
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

        </div>
    );
}

export default CheckRes;