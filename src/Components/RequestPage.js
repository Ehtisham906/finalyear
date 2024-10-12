import React, {useState} from 'react';



const RequestPage = () => {
  // Define the 'submitted' state and 'setSubmitted' function
  const [submitted, setSubmitted] = useState(false);

  // Define the 'handleSubmit' function
  const handleSubmit = (e) => {
    e.preventDefault();
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
            Hospital/Clinic Name:
            <input type="text" name="hospital" required />
          </label>
          <br />
          <label>
            Contact Number:
            <input type="number" name="contact" required />
          </label>
          <br />
          <label>
            Blood Type Required:
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