import React, {useState} from 'react';

const DonatePage = () => {

  const [submitted, setSubmitted] = useState(false);

  // Define the 'handleSubmit' function
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="donate-page">
      <h1>Donate Blood</h1>
      {!submitted ? (
        <form id='donate' onSubmit={handleSubmit} method='post'>
        <p>Your donation can save lives. Register below to become a donor.</p>
        <label>
          Full Name:
          <input type="text" name="name" required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Phone Number:
          <input type="number" name="phone" required />
        </label>
        <label>
          Address:
          <input type="text" name="address" required />
        </label>
        <br />
        <label>
          Blood Type:
          <select name="blood-type" required>
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
        <button type="submit">Submit</button>
      </form>
      ) : (
        <div className='Sub'>
          <h1>Thank You</h1>
          <h6>You Are registered with the blood bank system,
          you will be contacted on need of your blood group.</h6>
        </div>
      )
      }
    </div>
  );
};

export default DonatePage;
