import React, { useState, useEffect } from 'react';

const RequestPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    hospital: '',
    contactNumber: '',
    bloodType: '',
  });
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Fetch the user's location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error('Error fetching location:', error)
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/registerBlood/send-register-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred. Please try again.');
    }

    setSubmitted(true);
  };

  return (
    <div className="request-page">
      <h1>Request Blood</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <p>If you are in urgent need of blood, please fill out the form below to make a request.</p>
          <div className="form-group">
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Hospital/Clinic Name:
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Contact Number:
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Blood Type Required:
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </label>
          </div>
          <button type="submit" className="btn-submit">Submit Request</button>
        </form>
      ) : (
        <div className="confirmation">
          <h2>Blood Request Submitted</h2>
          <p>Here is a list of donors with the required blood type. Please contact them directly.</p>
          <table className="donor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Address</th>
                <th>Blood Group</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adnan Ali Shah</td>
                <td>03165238384</td>
                <td>Prince Colony jutyal Gilgit</td>
                <td>O+</td>
              </tr>
              <tr>
                <td>Wajid Ali</td>
                <td>03555552869</td>
                <td>Near National Bakers Baig Market Danyore Gilgit</td>
                <td>A-</td>
              </tr>
              <tr>
                <td>Murtaza</td>
                <td>03405167534</td>
                <td>Globe chock near karakoram international university gilgit</td>
                <td>B+</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* Map Section */}
      <div className="map-container">
        <h2>Nearby Donor Locations</h2>
        <iframe
          id="waze-map"
          src={`https://embed.waze.com/iframe?zoom=14&lat=${userLocation.lat}&lon=${userLocation.lng}`}
          width="600"
          height="400"
          allowFullScreen
          style={{ border: 0 }}
        ></iframe>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h4>About Us</h4>
            <p>
              Blood Bank Management System connects donors and recipients to ensure timely blood supply. Join us in saving lives.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/donate">Donate Blood</a></li>
              <li><a href="/request">Request Blood</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Info</h4>
            <p>Email: support@bloodbank.org</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Blood Drive, Heartsville</p>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Blood Bank Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RequestPage;
