import React from 'react';
// import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="navbar">
        <div className="logo">
          <h1>Blood Bank</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/donate">Donate Blood</a></li>
            <li><a href="/request">Request Blood</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">LogIn</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h2>Save Lives, Donate Blood</h2>
        <p>Your donation can make a difference!</p>
        <div className="buttons">
          <a href="/donate" className="btn-primary">Donate Blood</a>
          <a href="/request" className="btn-secondary">Request Blood</a>
        </div>
      </section>

      <section className="about-section">
        <h3>How We Help</h3>
        <p>
          Our blood bank system helps manage blood donations, track inventory,
          and ensure quick and easy access to blood for those in need.
        </p>
      </section>

      <footer>
        <p>&copy; 2024 Blood Bank Management System</p> <br />
        <h4>Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook |</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"> Twitter |</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"> Instagram</a>
      </footer>
    </div>
  );
};

export default HomePage;
