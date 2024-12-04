import React, { useState } from "react";

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-about">
        <h4>About Us</h4>
        <p>
          We are committed to connecting blood donors with those in need to
          ensure safe and timely blood transfusions.
        </p>
      </div>
      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li>
            <a href="#home" target="_blank" rel="noopener noreferrer">
              Home
            </a>
          </li>
          <li>
            <a href="#about" target="_blank" rel="noopener noreferrer">
              About
            </a>
          </li>
          <li>
            <a href="#services" target="_blank" rel="noopener noreferrer">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" target="_blank" rel="noopener noreferrer">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-contact">
        <h4>Contact Info</h4>
        <p>Email: support@bloodconnect.com</p>
        <p>Phone: +123 456 789</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 BloodConnect. All rights reserved.</p>
    </div>
  </footer>
);

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error

    try {
      const response = await fetch(`${API_URL}/contact/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to send the message. Please try again later.");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          If you have any questions or need assistance, please reach out to us
          by filling out the form below.
        </p>
      </div>

      {submitted ? (
        <div className="success-message">
          <h2>Thank You!</h2>
          <p>Your message has been sent successfully. We'll get back to you soon.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="name"
              required
              aria-label="Your Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Enter a valid email address"
              aria-label="Your Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-label="Your Message"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      )}

      <Footer />
    </div>
  );
};

export default ContactPage;
