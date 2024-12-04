import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img from "../Images/2.jpg";
import img1 from "../Images/3.jpg";
import img2 from "../Images/6.webp";
import img3 from "../Images/boy.jpeg";
import img4 from "../Images/hsptl.jpeg";
import img5 from "../Images/0.jpeg";
import img6 from "../Images/dr1.jpg";
import img7 from "../Images/dr3.jpeg";
import imgf from '../Images/icon-facebook.webp';
import imgt from '../Images/icon-twitter.webp';
import imgi from '../Images/icon-instagram.jpeg';
import imgh from '../Images/photo.jpg';
import imgj from '../Images/New 2.png';
import imgk from '../Images/new.jpg'
import { useSelector } from 'react-redux';


const HomePage = () => {
  const { currentUser } = useSelector(state => state.user)
  const [users, setUsers] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 }); // Pagination state
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [userLocation, setUserLocation] = useState(null); // User's current location

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:4000/usernames?page=${pagination.currentPage}`); // Replace with your backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.users); // Save user array to state
        setPagination({ currentPage: data.currentPage, totalPages: data.totalPages }); // Save pagination data
        setLoading(false); // Mark loading as complete
      } catch (err) {
        setError(err.message || "Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pagination.currentPage]); // Re-fetch data when currentPage changes

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching user location: ", error);
          alert("Unable to fetch your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  // Filtered users based on the selected blood type
  const filteredUsers = selectedBloodType
    ? users.filter((user) => user.bloodType === selectedBloodType)
    : users;
  return (
    <div className="home-page">

      <div>
        <h1 className="text-2xl font-bold mb-4">Registered Donors</h1>

        {/* Blood Type Filter */}
        <div className="mb-4">
          <label htmlFor="bloodTypeFilter" className="font-medium mr-2">
            Filter by Blood Type:
          </label>
          <select
            id="bloodTypeFilter"
            className="border p-2 rounded-md"
            value={selectedBloodType}
            onChange={(e) => setSelectedBloodType(e.target.value)}
          >
            <option value="">All Blood Types</option>
            {[
              "A+",
              "A-",
              "B+",
              "B-",
              "AB+",
              "AB-",
              "O+",
              "O-",
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Donor Cards */}
        {filteredUsers.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-y-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="w-[60%] bg-red-600  flex-wrap flex border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
                onClick={() => {
                  if (!userLocation) {
                    alert("Unable to determine your current location.");
                    return;
                  }

                  if (user.address) {
                    const origin = `${userLocation.latitude},${userLocation.longitude}`;
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                        origin
                      )}&destination=${encodeURIComponent(user.address)}&travelmode=driving`,
                      "_blank"
                    );
                  } else {
                    alert("Address not available for this user.");
                  }
                }}
                title="Click to view route on Google Maps"
              >
                <table className="text-left border-collapse">
                  <thead>
                    <tr>
                      <th className='bg-red-600'>Name</th>
                      <th className='bg-red-600'>Email</th>
                      <th className='bg-red-600'>Blood Type</th>
                      <th className='bg-red-600'>Phone Number</th>
                      <th className='bg-red-600'>Address</th>
                      <th className='bg-red-600'>Picture</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td className='text-black'>
                        {user.firstName || user.fullName} {user.lastName || ""}
                      </td>
                      <td className='text-black'>{user.email || "No Email Available"}</td>
                      <td className='text-black'>{user.bloodType || "N/A"}</td>
                      <td className='text-black'>
                        {currentUser ? user.phoneNumber || "Not Provided" : "Please Sign In First"}
                      </td>
                      <td className='text-black'>{user.address || "No Address Available"}</td>
                      <td className="w-20 h-20">
                        <img
                          src={user.avatar || "/default-avatar.png"} // Fallback avatar
                          alt={`${user.firstName || "Donor"}'s Avatar`}
                          className="rounded-full w-full h-full object-cover"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No donors found for the selected blood type.</p>
        )}

        
        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="mt-6 text-center">
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: Math.max(prev.currentPage - 1, 1),
                  }))
                }
                disabled={pagination.currentPage <= 1}
                className={`p-2 rounded-lg transition-colors duration-200 ${pagination.currentPage <= 1 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  } text-white`}
              >
                Previous
              </button>

              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: Math.min(prev.currentPage + 1, pagination.totalPages),
                  }))
                }
                disabled={pagination.currentPage >= pagination.totalPages}
                className={`p-2 rounded-lg transition-colors duration-200 ${pagination.currentPage >= pagination.totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  } text-white`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="hero">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="hero-slider"
        >
          <SwiperSlide>
            <div className="hero-slide">
              <h2>Save Lives, Donate Blood</h2>
              <p>Your donation can make a difference!</p>
              <img src={imgh} alt="Donate Blood" width={"300px"} height={"300px"} className='w-64' />
              <div className="buttons">
                <a href="/donate" className="btn-primary">Donate Blood</a>
                <a href="/request" className="btn-secondary">Request Blood</a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-slide">
              <h2>Become a Hero, Save a Life</h2>
              <p>Every drop counts. Register as a donor today.</p>
              <img src={imgj} alt="Register as Donor" width={"300px"} height={"300px"} className='w-64' />
              <div className="buttons">
                <a href="/" className="btn-primary">Register</a>
                <a href="/" className="btn-secondary">Learn More</a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-slide">
              <h2>Request the blood in emergency situations</h2>
              <p>Ensuring blood is available when it’s needed the most.</p>
              <img src={imgk} alt="Track Inventory" width={"300px"} height={"300px"} className='w-64' />
              <div className="buttons">
                <a href="/donate" className="btn-primary">Track Now</a>
                <a href="/request" className="btn-secondary">View Inventory</a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>


      {/* About Section */}
      <section className="about-section">
        <h3>How We Help</h3>
        <p>
          Our blood bank system helps manage blood donations, track inventory,
          and ensure quick and easy access to blood for those in need.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h3>How It Works</h3>
        <div className="steps">
          <div className="step">
            <img src={img} alt="Register as a Donor" />
            <h4>1. Register as a Donor</h4>
            <p>Sign up and provide your details to become a donor and save lives.</p>
          </div>
          <div className="step">
            <img src={img1} alt="Donate Blood" />
            <h4>2. Donate Blood</h4>
            <p>Visit one of our collection centers or wait for a scheduled drive.</p>
          </div>
          <div className="step">
            <img src={img2} alt="Track Inventory" />
            <h4>3. Track Inventory</h4>
            <p>Our system monitors blood stock, ensuring it's available when needed.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        <h3>Our Impact</h3>
        <div className="stats">
          <div className="stat-item">
            <img src={img3} alt="Donors Icon" />
            <h4>500+</h4>
            <p>Donors Registered</p>
          </div>
          <div className="stat-item">
            <img src={img} alt="Units Icon" />
            <h4>1000+</h4>
            <p>Units of Blood Distributed</p>
          </div>
          <div className="stat-item">
            <img src={img4} alt="Hospitals Icon" />
            <h4>300+</h4>
            <p>Hospitals Supported</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h3>What People Say</h3>
        <div className="testimonial-slider">
          <div className="testimonial">
            <img src={img5} alt="Sarah J." />
            <p>"Thanks to this system, I was able to quickly find a blood donor during an emergency. Truly life-saving!"</p>
            <h5>- Sarah J.</h5>
          </div>
          <div className="testimonial">
            <img src={img6} alt="John M." />
            <p>"As a regular donor, it's amazing to see how well-organized the donation process has become!"</p>
            <h5>- John M.</h5>
          </div>
          <div className="testimonial">
            <img src={img7} alt="Alex K." />
            <p>"I appreciate how easy it is to request blood for my loved ones. This system is a blessing."</p>
            <h5>- Alex K.</h5>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-us">
        <h3>Contact Us</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <img src={img} alt="Blood Bank Logo" />
            <p>&copy; 2024 Blood Bank Management System</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Our Services</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>123 Blood Drive St.</p>
            <p>City, State, Zip</p>
            <p>Email: info@bloodbank.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <img src={imgf} alt="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <img src={imgt} alt="Twitter" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <img src={imgi} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default HomePage;
