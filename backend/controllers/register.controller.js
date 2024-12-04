
import nodemailer from 'nodemailer';

export const registerBlood = async (req, res) => {
    const {fullName, hospital, contactNumber, bloodType } = req.body;

    // Set up transporter with your email provider's SMTP settings
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Change this if using a different email service
        auth: {
            user: process.env.email, // Your email
            pass: process.env.pass,// Your email password or app password
        },
    });

    // Set up email options
    let mailOptions = {
        from: 'shahadnanali6@gmail.com', // Sender address
        to: 'shahadnanali6@gmail.com', // Recipient email
        subject: 'Blood REquest',
        text: `
        Blood REquest:
        - Donar Name: ${fullName}
        - hospital: ${hospital}
        - Contact Number: ${contactNumber}
        - Blood Type: ${bloodType}
      `,
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email' });
    }
}
