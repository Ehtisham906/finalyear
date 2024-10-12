import React, { useState } from 'react';


const Signup = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., sending data to a server)
    setSubmitted(true);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup Form</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="submit-button">Signup</button>
            </div>
          </form>
        ) : (
          <div className="success-message">
            <h3>Signup Successful!</h3>
            <p>Welcome, {formData.username}! Your account has been created.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
