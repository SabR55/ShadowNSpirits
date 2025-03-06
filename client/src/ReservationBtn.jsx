import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

function ReservationBtn(){
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate minimum (today) and maximum (3 weeks from today) dates
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 21); // 3 weeks ahead
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const todayFormatted = formatDate(today);
  const maxDateFormatted = formatDate(maxDate);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        id="reservationBtn"
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg z-50 transition-colors duration-200"
      >
        Make a Reservation
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Make a Reservation</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>
            
            {/* Reservation Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    min={todayFormatted}
                    max={maxDateFormatted}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none pr-10"
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Guests
                </label>
                <div className="relative">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none pr-10">
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5">5 people</option>
                    <option value="6">6 people</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              <div>
                <a className="block text-sm font-medium text-gray-700 mb-1">
                Each reservation includes a 15-minute grace period.
                </a>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                  style={{ backgroundColor: '#441752', color: 'white' }}
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationBtn;