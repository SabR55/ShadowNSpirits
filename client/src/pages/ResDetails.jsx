import { X, ChevronDown, Edit } from 'lucide-react';
import { useState } from 'react';

function ResDetails(){
    const [isEditing, setIsEditing] = useState(false);

    const sampleReservation = {
        resNum: "12345",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1122 2344",
        date: "March 15, 2025",
        time: "7:30 PM",
        guests: 4
      };
    
    // Use provided reservation or sample data
    const data = sampleReservation;
    

    function handleEdit(){
        setIsEditing(true);
    }

    function handleSave(){
        setIsEditing(false);
    }

    function handleCancel(){
        setIsEditing(false);
    }
    

    return(
        <div className="flex items-center justify-center">
            <div className="rounded-lg px-8 py-12 max-w-md w-full bg-white">
                <div className="flex items-center justify-center">
                    <h2 id="resModalTitle" className="text-xl font-bold">Reservation Details</h2>
                </div>

                <div className="text-center py-4">
                    <h2 className="text-5xl font-bold text-gray-800">{sampleReservation.resNum}</h2>
                    <p className="text-sm text-gray-500 mt-1">Reservation Number</p>
                </div>

                <div className="py-4 block text-sm font-medium text-gray-700 mb-1 grid grid-cols-1 gap-2">
                    <p>{sampleReservation.name}</p>
                    <p>{sampleReservation.email}</p>
                    <p>{sampleReservation.phone}</p>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <input 
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Time
                            </label>
                            <input 
                                type="time"
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
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none pr-10 ${
    !isEditing ? 'bg-gray-100' : 'bg-white border'
}`}
                                disabled={!isEditing}
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
                            type="submit"
                            className="w-full text-white font-medium py-2 px-4 rounded-md"
                            style={{backgroundColor:'#441752', color:'white'}}
                            onClick={handleEdit}
                            >
                            Edit Reservation
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 text-white py-2 px-4 rounded-md"
                                style={{backgroundColor:'#441752', color:'white'}}
                            >
                                Save
                            </button>
                            </div>
                        )}
                    </div>
                    
                </form>

                
            </div>
        </div>
    );
}

export default ResDetails;