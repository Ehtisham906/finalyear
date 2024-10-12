import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import DonatePage from './Components/DonatePage';
import RequestPage from './Components/RequestPage';
import AboutPage from './Components/AboutPage';
import ContactPage from './Components/ContactPage';
import './App.css';
import LogIn from './Components/LogIn';
import Signup from './Components/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
