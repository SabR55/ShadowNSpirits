import React, { useState } from 'react';
import { X, ChevronDown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservationBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Calculate minimum (tomorrow) and maximum (3 weeks from today) dates
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1); // Set to tomorrow
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  const tomorrowFormatted = formatDate(tomorrow);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: tomorrowFormatted,
    time: '18:00', // Default to 6:00 PM
    guests: '2'    // Default to 2 people
  });
  
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 21); // 3 weeks ahead
  const maxDateFormatted = formatDate(maxDate);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/make-reservation', formData)
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
    
    // Get reservation number from the response
    const resNum = response.data.data.resNum;
    
    // Make the GET request to fetch reservation details
    return axios.get(`/reservation-details/${resNum}`)
      .then(detailsResponse => {
        console.log('Reservation details fetched:', detailsResponse.data);
        
        // Redirect to the details page
        navigate(`/reservation-details/${resNum}`);
      })
      .catch(detailsError => {
        console.error('Error fetching reservation details:', detailsError);
      });
  })
  .catch(error => {
    console.error('Error submitting form:', error);
    })
    .finally(() => {
        closeModal();
    });
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        id="reservationBtn"
        onClick={openModal}
        className="fixed bottom-2 right-6 font-medium py-2 px-4 rounded-md shadow-lg transition-colors duration-200"
      >
        Make a Reservation
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white p-6 max-w-md w-full mx-4">
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
                <label className="inputLabel">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="inputBox inputBoxEditing"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label className="inputLabel">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="inputBox inputBoxEditing"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="inputLabel">
                  {/* Check that the number is 8 digits */}
                  Phone Number <a style={{color:'#C70039', display:'none'}}>*Invalid number</a>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="inputBox inputBoxEditing"
                  placeholder="9878 6545"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="inputLabel">
                    Date
                  </label>
                  <div className='realtive'>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={tomorrowFormatted}
                      max={maxDateFormatted}
                      className="inputBox inputBoxEditing"
                      required
                    />
                    
                  </div>
                </div>
                
                <div>
                  <label className="inputLabel">
                    Time
                  </label>
                  <div className='relative'>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="inputBox inputBoxEditing appearance-none"
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
                    <div className="text-black pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <Clock size={18}/>
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
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="inputBox inputBoxEditing appearance-none"
                  >
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5">5 people</option>
                    <option value="6">6 people</option>
                  </select>
                  <div className="text-black pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              <div className="inputLabel">
                <a>Each reservation includes a 15-minute grace period</a>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="formButton"
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