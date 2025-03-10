import { X, ChevronDown, Edit, Trash, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ResDetails() {
    // Get reservation number from URL params
    const { reservationNumber } = useParams();

    const [reservation, setReservation] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

    const navigate = useNavigate();

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

    // Delete Modal
    function openDeleteModal() {
        setIsDeleteModalOpen(true);
    };

    function closeDeleteModal() {
        setIsDeleteModalOpen(false);
    }

    function deleteRes() {
        setIsDeleteConfirmed(true);
    }

    function deleteResConfirmed() {
        navigate('/');
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600"
                                disabled={!isEditing}
                                style={{width:"165px"}}
                            />
                            ):(
                                <input 
                                type="date"
                                value={formatDateForInput(data.resDate)}
                                className="w-full px-3 border border-gray-300 rounded-md"
                                style={{height:"42px"}}
                            />
                            )}
                            
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">
                                Time
                            </label>

                            <div className='text black relative'>
                                <select
                                name="time"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none pr-10
                                    ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                                disabled={!isEditing}
                                value={formatTimeForInput(data.resTime)}
                                >
                                <option value="16:00">4:00 PM</option>
                                <option value="16:30">4:30 PM</option>
                                <option value="17:00">5:00 PM</option>
                                <option value="17:30">5:30 PM</option>
                                <option value="18:00">6:00 PM</option>
                                <option value="18:30">6:30 PM</option>
                                <option value="19:00">7:00 PM</option>
                                <option value="19:30">7:30 PM</option>
                                <option value="20:00">8:00 PM</option>
                                <option value="20:30">8:30 PM</option>
                                <option value="21:00">9:00 PM</option>
                                </select>
                                <div className="text-black pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <Clock 
                                        size={18} 
                                        className='text-black'
                                        style={{display:!isEditing ? 'none' : 'block'}}/>
                                </div>

                            </div>

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
                                style={{backgroundColor:'#441752'}}
                                onClick={handleEdit}
                            >
                                Edit Reservation
                            </button>
                            
                        ) : (
                            <div className="flex flex-row items-center gap-4">
                                <button 
                                    type="button"
                                    className="p-2 bg-gray-100 rounded-md flex items-center justify-center"
                                    style={{aspectRatio: '1/1'}}
                                    onClick={openDeleteModal}
                                >
                                    <Trash size={18} className="text-gray-500" />
                                </button>
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
                        )}
                    </div>
                    
                    {/* Delete Modal */}
                    {isDeleteModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg py-10 px-6 max-w-md w-full mx-4">
                                {!isDeleteConfirmed ? (
                                    <div>
                                        <div className="text-center mb-8">
                                        <h2 id="resModalTitle" className="text-xl font-bold">Delete Reservation?</h2>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                            <button
                                                className='w-full bg-gray-400 text-white py-2 px-4 rounded-md'
                                                onClick={closeDeleteModal}
                                                >
                                                Cancel
                                            </button>
                                            </div>

                                            <div>
                                            <button
                                                className="w-full text-white py-2 px-4 rounded-md"
                                                style={{backgroundColor:'#441752'}}
                                                onClick={deleteRes}
                                                >
                                                Confirm
                                            </button>
                                            </div>

                                        </div>

                                    </div>) : (
                                    <div>
                                        <div className="text-center mb-8">
                                        <h2 id="resModalTitle" className="text-xl font-bold">Your reservation has been cancelled.</h2>
                                        </div>

                                        <div>
                                        <button
                                            type="button" // Changed from "submit" to prevent form submission
                                            className="w-full text-white font-medium py-2 px-4 rounded-md"
                                            style={{backgroundColor:'#441752'}}
                                            onClick={deleteResConfirmed}
                                            >
                                            Ok
                                        </button>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export default ResDetails;