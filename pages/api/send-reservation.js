import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, mobile, email, date, time, seats } = req.body;

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email content for restaurant
  const restaurantMailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.RESTAURANT_EMAIL || process.env.SMTP_USER,
    subject: 'New Reservation Request - Milagro Restaurant',
    html: `
      <h2>New Reservation Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Number of Seats:</strong> ${seats}</p>
    `,
  };

  // Email content for customer
  const customerMailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Reservation Request Received - Milagro Restaurant',
    html: `
      <h2>Thank you for your reservation request!</h2>
      <p>Dear ${name},</p>
      <p>We have received your reservation request with the following details:</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Number of Seats:</strong> ${seats}</p>
      <br>
      <p>We will confirm your reservation shortly.</p>
      <p>Best regards,<br>Milagro Restaurant Team</p>
    `,
  };

  try {
    // Send email to restaurant
    await transporter.sendMail(restaurantMailOptions);
    
    // Send confirmation email to customer
    await transporter.sendMail(customerMailOptions);

    res.status(200).json({ message: 'Reservation emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending reservation emails', error: error.message });
  }
}
