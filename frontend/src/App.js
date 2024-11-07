import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import HomePage from './Components/HomePage';
import DonatePage from './Components/DonatePage';
import RequestPage from './Components/RequestPage';
import AboutPage from './Components/AboutPage';
import ContactPage from './Components/ContactPage';
import PrivateRoute from './Components/PrivateRoute'
import './App.css';
import LogIn from './Components/LogIn';
import Signup from './Components/SignUp';
import Header from './Components/Header';
import Profile from './pages/Profile';

function App() {

  return (
    <Router>
      <div className="App">
        <div>
          <h1> </h1>
        </div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sign-in" element={<LogIn />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
