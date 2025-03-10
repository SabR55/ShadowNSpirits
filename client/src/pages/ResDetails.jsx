import { X, ChevronDown, Edit, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResDetails() {
    // Get reservation number from URL params
    const { reservationNumber } = useParams();

    const [reservation, setReservation] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch reservation data
    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await axios.get(`/reservation-details/${reservationNumber}`);
                setReservation(response.data);
                
            } catch {
                console.log('Could not find reservation.');
            }
        };
        
        if (reservationNumber) {
            fetchReservation();
        }
    }, [reservationNumber]);

    // Sample reservation data (fallback)
    const sampleReservation = {
        resNum: "12345",
        resName: "John Doe",
        resEmail: "john.doe@example.com",
        resPhone: "1122 2344",
        resDate: "March 15, 2025",
        resTime: "7:30 PM",
        resGuests: 4
    };
    
    // Use real reservation data if available, otherwise use sample data
    const data = reservation || sampleReservation;

    // Format date for display in text
    const formatDisplayDate = (dateString) => {
        // Check if dateString is in ISO format (YYYY-MM-DD)
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'short' });
            const year = date.getFullYear();
            
            // Return in format: "21 Mar 2025"
            return `${day} ${month} ${year}`;
        }
        // If it's already in a display format, return as is
        return dateString;
    };

    // Convert date to YYYY-MM-DD format for date input
    const formatDateForInput = (dateString) => {
        try {
            // If it's already in YYYY-MM-DD format
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                return dateString;
            }
            
            // Parse date string like "March 15, 2025"
            const date = new Date(dateString);
            
            // Check if date is valid
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', dateString);
                return '';
            }
            
            // Format as YYYY-MM-DD for input element
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            
            return `${year}-${month}-${day}`;
        } catch (error) {
            console.error('Error parsing date:', dateString, error);
            return '';
        }
    };

    // Format time for display (e.g., "7:30 PM")
    const formatDisplayTime = (timeString) => {
        // If already in display format like "7:30 PM"
        if (/\d{1,2}:\d{2}\s[AP]M/.test(timeString)) {
            return timeString;
        }
        
        // If in 24-hour format (HH:MM)
        if (/^\d{2}:\d{2}$/.test(timeString)) {
            const [hours, minutes] = timeString.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const hour12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
            return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
        }
        
        return timeString;
    };

    // Convert time to 24-hour format (HH:MM) for time input
    const formatTimeForInput = (timeString) => {
        try {
            // If already in 24-hour format
            if (/^\d{2}:\d{2}$/.test(timeString)) {
                return timeString;
            }
            
            // Parse time string like "7:30 PM"
            const match = timeString.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
            if (!match) {
                console.error('Invalid time format:', timeString);
                return '';
            }
            
            let hours = parseInt(match[1], 10);
            const minutes = match[2];
            const period = match[3].toUpperCase();
            
            // Convert to 24-hour format
            if (period === 'PM' && hours < 12) {
                hours += 12;
            } else if (period === 'AM' && hours === 12) {
                hours = 0;
            }
            
            // Format as HH:MM
            return `${hours.toString().padStart(2, '0')}:${minutes}`;
        } catch (error) {
            console.error('Error parsing time:', timeString, error);
            return '';
        }
    };

    function handleEdit() {
        setIsEditing(true);
    }

    function handleSave() {
        setIsEditing(false);
    }

    function handleCancel() {
        setIsEditing(false);
    }

    return (
        <div className="flex items-center justify-center">
            <div className="rounded-lg px-8 py-12 my-8 max-w-md w-full bg-white">
                <div className="flex items-center justify-center">
                    <h2 id="resModalTitle" className="text-xl font-bold">Reservation Details</h2>
                </div>

                <div className="text-center pt-4">
                    <h2 className="text-5xl font-bold text-gray-800">{data.resNum}</h2>
                    <p className="text-sm text-gray-500 mt-1">Reservation Number</p>
                </div>

                <div className="py-4 block text-sm font-medium text-gray-700 mb-1 grid grid-cols-1 gap-2">
                    <p>{data.resName}</p>
                    <p>{data.resEmail}</p>
                    <p>{data.resPhone}</p>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            {!isEditing ? (
                                <input 
                                type="text"
                                value={formatDisplayDate(data.resDate)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                disabled={!isEditing}
                                style={{width:"165px"}}
                            />
                            ):(
                                <input 
                                type="date"
                                value={formatDateForInput(data.resDate)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            )}
                            
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Time
                            </label>
                            <input 
                                type="time"
                                value={formatTimeForInput(data.resTime)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Guests
                        </label>
                        <div className="relative">
                            <select
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none pr-10 
                                    ${!isEditing ? 'bg-gray-100' : 'bg-white border'}`}
                                disabled={!isEditing}
                                value={data.resGuests}
                            >
                                <option value="2">2 people</option>
                                <option value="3">3 people</option>
                                <option value="4">4 people</option>
                                <option value="5">5 people</option>
                                <option value="6">6 people</option>
                            </select>
                            {isEditing && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <ChevronDown size={18} />
                                </div>
                            )}
                        </div>
                    </div> 

                    <div className="pt-2">
                        {!isEditing ? (
                            <button
                                type="button" // Changed from "submit" to prevent form submission
                                className="w-full text-white font-medium py-2 px-4 rounded-md"
                                style={{backgroundColor:'#441752', color:'white'}}
                                onClick={handleEdit}
                            >
                                Edit Reservation
                            </button>
                            
                        ) : (
                            <div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="flex-1 text-white py-2 px-4 rounded-md"
                                        style={{backgroundColor:'#441752', color:'white'}}
                                    >
                                        Save
                                    </button>
                                </div>

                                <div className='pt-4 text-gray-500 hover:underline flex flex-row items-center gap-2 cursor-pointer"'>
                                    <Trash size={18} /><p>Delete Reservation</p>
                                </div>

                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResDetails;