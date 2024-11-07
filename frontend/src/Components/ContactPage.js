import React from 'react';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, please reach out to us.</p>
      <form>
        <label>
          Your Name:
          <input type="text" name="name" required />
        </label>
        <br />
        <label>
          Your Email:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Message:
          <textarea name="message" required></textarea>
        </label>
        <br />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
