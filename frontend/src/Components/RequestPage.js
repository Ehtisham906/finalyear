import React, { useState } from 'react';



const RequestPage = () => {
  // Define the 'submitted' state and 'setSubmitted' function
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    hospital: '',
    contactNumber: '',
    bloodType: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  // Define the 'handleSubmit' function
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


  // const RequestPage = () => {
  return (
    <div className="request-page">
      <h1>Request Blood</h1>
      {!submitted ? (
        <form id='loginform' onSubmit={handleSubmit} method='post'>
          <p>If you are in urgent need of blood, please fill out the form below to make a request.</p>
          <label>
            Please enter your full name:
            <input type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required />
          </label>
          <label>
            Hospital/Clinic Name:
            <input type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              required />
          </label>
          <br />
          <label>
            Contact Number:
            <input type="number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required />
          </label>
          <br />
          <label>
            Blood Type Required:
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required>
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
          <br />
          <button type="submit">Submit Request</button>
        </form>
      ) : (
        <div>
          {/* <h3 className="text">Blood Request Submitted</h3> */}
          <p>Here is the list of blood groups with name and contact which you need.</p>
          <table>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Blood Group</th>
            </tr>
            <tr>
              <td>Adnan Ali Shah</td>
              <td>123-456-7890</td>
              <td>123 Main St, Cityville</td>
              <td>O+</td>
            </tr>
            <tr>
              <td>Wajid Ali</td>
              <td>987-654-3210</td>
              <td>456 Elm St, Townsville</td>
              <td>A-</td>
            </tr>
            <tr>
              <td>Murtaza</td>
              <td>555-123-4567</td>
              <td>789 Oak St, Villagecity</td>
              <td>B+</td>
            </tr>
          </table>
        </div>
      )
      }
    </div>
  );
}

export default RequestPage;