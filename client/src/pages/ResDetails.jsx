import { X, ChevronDown, Edit, Trash, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import images from '../assets/assets.js';

function ResDetails() {
    // Get reservation number from URL params
    const { reservationNumber } = useParams();

    const [reservation, setReservation] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const [editBlocked, setEditBlocked] = useState(false);

    const navigate = useNavigate();

    // Editable values
    const [editedValues, setEditedValues] = useState({
        resDate: '',
        resTime: '',
        resGuests: ''
    });

    // Fetch reservation data
    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await axios.get(`/reservation-details/${reservationNumber}`);
                setReservation(response.data);
                
                // Set editable values
                setEditedValues({
                    resDate: formatDateForInput(response.data.resDate),
                    resTime: formatTimeForInput(response.data.resTime),
                    resGuests: response.data.resGuests
                });
                
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

    // Calculate minimum and maximum dates for the date picker
    const calculateDateRestrictions = () => {
        // Get tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Get date 3 weeks from tomorrow
        const maxDate = new Date(tomorrow);
        maxDate.setDate(tomorrow.getDate() + 21); // 3 weeks = 21 days
        
        // Format as YYYY-MM-DD for input element's min and max attributes
        const formatDateString = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        return {
            minDate: formatDateString(tomorrow),
            maxDate: formatDateString(maxDate)
        };
    };
    
    // Get date restrictions
    const dateRestrictions = calculateDateRestrictions();

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

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedValues({
            ...editedValues,
            [name]: value
        });
    };

    function handleEdit() {
        // Initialize edited values with current data
        setEditedValues({
            resDate: formatDateForInput(data.resDate),
            resTime: formatTimeForInput(data.resTime),
            resGuests: data.resGuests
        });
        setIsEditing(true);
        setEditBlocked(false);
    }

    async function handleSave() {

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        if (editedValues.resDate == today) {
            setEditBlocked(true);
            handleCancel();
            return;
        }

        try {
            // Convert date back to display format for the API
            const formattedDate = new Date(editedValues.resDate);
            const month = formattedDate.toLocaleString('en-US', { month: 'long' });
            const day = formattedDate.getDate();
            const year = formattedDate.getFullYear();
            const displayDate = `${month} ${day}, ${year}`;

            // Convert time back to display format
            const [hours, minutes] = editedValues.resTime.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const hour12 = hours % 12 || 12;
            const displayTime = `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;

            // Prepare data for the API
            const updatedReservation = {
                resNum: data.resNum,
                resDate: displayDate,
                resTime: displayTime,
                resGuests: parseInt(editedValues.resGuests)
            };

            // Send update request to the server
            const response = await axios.put(`/reservation-update/${data.resNum}`, updatedReservation);
            
            // Update the local state with the response data
            setReservation({
                ...data,
                ...response.data
            });

            setIsSaveModalOpen(true);

        } catch (error) {
            console.error("Error updating reservation:", error);
            alert("Failed to update reservation. Please try again.");
        }
    }

    function handleSaveConfirmed() {
        navigate(0); // Refresh Page
    }

    function handleCancel() {
        // Reset edited values
        setEditedValues({
            resDate: formatDateForInput(data.resDate),
            resTime: formatTimeForInput(data.resTime),
            resGuests: data.resGuests
        });
        
        // Exit edit mode
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
        // navigate('/');

        try {

            console.log("Res Num: " + data.resNum);
            // Find the reservation with matching resNum and update its status
            axios.put('/reservation-cancelled', {
                resNum: data.resNum,  // Assuming resNum is available in this scope
                resStatus: 3
            })
            .then(response => {
                console.log("Reservation status updated successfully");
                
                // Navigate to home page after successful update
                navigate('/');
            })
            .catch(error => {
                console.error("Error updating reservation:", error);
                // Still navigate to home page even if update fails
                // navigate('/');
            });
        } catch (error) {
            console.error("Unexpected error:", error);
            navigate('/');
        }
    }
   

    return (
        
        <div className="flex items-center justify-center relative w-full">
            <img 
                src={images.smokeBg}
                className="absolute inset-0 w-full h-full object-cover -z-0"
                alt="Smoky background"
            />

            <div className="px-8 py-6 mt-10 max-w-md w-96 bg-white">
                <div className="flex items-center justify-center">
                    <h2 id="resModalTitle" className="text-xl font-bold">Reservation Details</h2>
                </div>

                <div className="px-8 py-12 my-8 max-w-md w-96 bg-white relative z-10">
                    <div className="text-center pt-4">
                        <h2 className="text-5xl font-bold text-gray-800">{data.resNum}</h2>
                        <p className="text-sm text-gray-500 mt-1">Reservation Number</p>
                    </div>

                    <div className="inputLabel py-4">
                        <p className='pb-2'>{data.resName}</p>
                        <p className='pb-2'>{data.resEmail}</p>
                        <p>{data.resPhone}</p>
                    </div>

                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="inputLabel">
                                    Date
                                </label>
                                {!isEditing ? (
                                    <input 
                                    type="text"
                                    value={formatDisplayDate(data.resDate)}
                                    className="inputBox"
                                    disabled={!isEditing}
                                    style={{width:"165px"}}
                                />
                                ):(
                                    <input 
                                    type="date"
                                    name="resDate"
                                    value={editedValues.resDate}
                                    onChange={handleInputChange}
                                    min={dateRestrictions.minDate}
                                    max={dateRestrictions.maxDate}
                                    className="inputBox inputBoxEditing"
                                />
                                )}
                                
                            </div>

                            <div>
                                <label className="inputLabel">
                                    Time
                                </label>

                                <div className='text black relative'>
                                    <select
                                    name="resTime"
                                    className={`${!isEditing ? 'inputBox' : 'inputBox inputBoxEditing'} appearance-none`}
                                    disabled={!isEditing}
                                    value={isEditing ? editedValues.resTime : formatTimeForInput(data.resTime)}
                                    onChange={handleInputChange}
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
                            <label className="inputLabel">
                                Number of Guests
                            </label>
                            <div className="relative">
                                <select
                                    name="resGuests"
                                    className={`${!isEditing ? 'inputBox' : 'inputBox inputBoxEditing'} appearance-none`}
                                    disabled={!isEditing}
                                    value={isEditing ? editedValues.resGuests : data.resGuests}
                                    onChange={handleInputChange}
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

                            {/*  Error Message. Guest cannot edit the day of reservation. */}
                            <div className="pt-2 inputLabel" style={{display: editBlocked ? "block" : "none" }}>
                                <a>To make changes the day of your reservation <br />please call us at 6767 8989</a>
                            </div>
                        </div> 

                        <div>
                            {!isEditing ? (
                                <button
                                    type="button" // Changed from "submit" to prevent form submission
                                    className="formButton" 
                                    onClick={handleEdit}
                                >
                                    Edit Reservation
                                </button>
                                
                            ) : (
                                <div className="flex flex-row items-center gap-4">
                                    <button 
                                        type="button"
                                        className="p-2 bg-gray-100 flex items-center justify-center"
                                        style={{aspectRatio: '1/1'}}
                                        onClick={openDeleteModal}
                                    >
                                        <Trash size={18} className="text-gray-500" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="formButton formButtonGray flex-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="formButton flex-1" 
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
                                                    className='formButton formButtonGray'
                                                    onClick={closeDeleteModal}
                                                    >
                                                    Cancel
                                                </button>
                                                </div>

                                                <div>
                                                <button
                                                    className="formButton"
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
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Save Confirmation Modal */}
                        {isSaveModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg py-10 px-6 max-w-md w-full mx-4">
                                    <div className="text-center mb-8">
                                        <h2 id="saveModalTitle" className="text-xl font-bold">Your edits have been saved.</h2>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            className="w-full text-white font-medium py-2 px-4 rounded-md"
                                            style={{backgroundColor:'#441752'}}
                                            onClick={handleSaveConfirmed}
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
            </div>
            </div>
        </div>
    );
}

export default ResDetails;