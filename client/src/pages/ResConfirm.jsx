import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ReservationConfirmation = () => {
  const location = useLocation();
  const reservation = location.state || {};
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified';
    
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 p-6">
          <h1 className="text-2xl font-bold text-white text-center">Reservation Confirmed!</h1>
        </div>
        
        <div className="p-6">
          <div className="mb-6 text-center">
            <div className="text-gray-500 text-sm">YOUR BOOKING NUMBER</div>
            <div className="text-3xl font-bold text-blue-600 tracking-wider mt-1">{reservation.bookingNumber || '00000'}</div>
            <div className="text-gray-500 mt-1 text-sm">Please save this number for your reference</div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Reservation Details</h2>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-500">Name</div>
                <div className="mt-1">{reservation.name || 'Not provided'}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Email</div>
                <div className="mt-1">{reservation.email || 'Not provided'}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500">Phone</div>
                <div className="mt-1">{reservation.phone || 'Not provided'}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Date</div>
                <div className="mt-1">{formatDate(reservation.date)}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Time</div>
                <div className="mt-1">{formatTime(reservation.time)}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Party Size</div>
                <div className="mt-1">{reservation.guests} {reservation.guests === '1' ? 'person' : 'people'}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              to="/"
              className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Return to Home
            </Link>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            A confirmation email has been sent to your email address.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmation;