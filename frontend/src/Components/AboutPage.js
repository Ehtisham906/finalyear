import React from 'react';
import img5 from "../Images/0.jpeg";
import img6 from "../Images/dr1.jpg";
import img7 from "../Images/dr4.jpeg";


const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Intro Section */}
      <section className="intro-section">
        <h1>About Us</h1>
        <p>
          Welcome to our Blood Bank Management System. We are dedicated to saving lives by
          ensuring blood availability and seamless donation management. Our mission is to
          facilitate the blood donation process and connect donors with those in need efficiently and safely.
        </p>
      </section>

      {/* Mission and Vision Section */}
      <section className="mission-vision">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            To provide a reliable, secure, and efficient blood management system that connects
            donors with recipients in real-time, ensuring blood is available whenever and wherever it's needed.
          </p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            To be a leader in digital blood donation and transfusion systems, enabling life-saving connections
            and fostering a community of regular, committed donors.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <ul>
          <li><strong>Commitment:</strong> Dedicated to saving lives through reliable blood services.</li>
          <li><strong>Transparency:</strong> Ensuring donors and recipients have accurate, accessible information.</li>
          <li><strong>Integrity:</strong> Maintaining high ethical standards and data privacy.</li>
          <li><strong>Compassion:</strong> Treating each request with respect and urgency.</li>
        </ul>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team">
          <div className="team-member">
            <img src={img5} alt="Dr. Sarah Thompson" />
            <h3>Dr. Sarah Thompson</h3>
            <p>Chief Medical Officer</p>
          </div>
          <div className="team-member">
            <img src={img6} alt="John Miller" />
            <h3>John Miller</h3>
            <p>Technical Director</p>
          </div>
          <div className="team-member">
            <img src={img7} alt="Ayesha Khan" />
            <h3>Ayesha Khan</h3>
            <p>Donor Relations Manager</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h4>About Us</h4>
            <p>
              We are committed to ensuring safe and efficient blood donation management. Join us in saving lives by becoming a part of our growing network.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/donate">Donate Blood</a></li>
              <li><a href="/request">Request Blood</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@bloodbank.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Main St, Cityville</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Blood Bank Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
