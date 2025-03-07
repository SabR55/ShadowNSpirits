import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservationBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '18:00', // Default to 6:00 PM
    guests: '2'    // Default to 2 people
  });
  const navigate = useNavigate();

  // Calculate minimum (today) and maximum (3 weeks from today) dates
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 21); // 3 weeks ahead
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const todayFormatted = formatDate(today);
  const maxDateFormatted = formatDate(maxDate);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Generate a random 5-digit booking number
  const generateBookingNumber = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/makeReservation', formData)
      .then(response => {
        // Reset form state to initial values
        setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '18:00',
            guests: '2'
        });
      
      console.log('Form submitted successfully', response);
      })
      .catch(error => {
          console.error('Error submitting form:', error);
      });

    
    // Generate booking number
    // const bookingNumber = generateBookingNumber();
    
    // Here you would typically make an API call to save the reservation
    // For now, we'll just navigate to the confirmation page with the data
    
    // Navigate to confirmation page with form data and booking number
    // navigate('/reservationConfirmed', { 
    //   state: { 
    //     ...formData,
    //     bookingNumber 
    //   } 
    // });
    
    // Close the modal
    closeModal();
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        id="reservationBtn"
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
      >
        Make a Reservation
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 id="resModalTitle" className="text-xl font-bold">Make a Reservation</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700">
                <X />
              </button>
            </div>
            
            {/* Reservation Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <a style={{color:'#C70039', display:'none'}}>*Invalid number</a>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="9878 6545"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                                      <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={todayFormatted}
                    max={maxDateFormatted}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none pr-10"
                    required
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
                  <select 
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none pr-10"
                  >
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

              <div className="block text-sm font-medium text-gray-700 mb-1">
                <a>Each reservation includes a 15-minute grace period.</a>
              </div>
              
              <div className="pt-2">
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
      )}
    </div>
  );
};

export default ReservationBtn;