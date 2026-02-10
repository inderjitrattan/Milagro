import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, phone, email, location, message } = req.body;

  if (!name || !phone || !email || !location || !message) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const restaurantMailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.RESTAURANT_EMAIL || process.env.SMTP_USER,
    subject: "New Franchise Enquiry - Milagro",
    html: `
      <h2>New Franchise Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Mobile:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  const customerMailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Franchise Enquiry Received - Milagro",
    html: `
      <h2>Thank you for your franchise enquiry!</h2>
      <p>Dear ${name},</p>
      <p>We have received your franchise enquiry with the following details:</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Message:</strong> ${message}</p>
      <br>
      <p>Our team will reach out to you shortly.</p>
      <p>Best regards,<br>Milagro Restaurant Team</p>
    `,
  };

  try {
    await transporter.sendMail(restaurantMailOptions);
    await transporter.sendMail(customerMailOptions);

    return res.status(200).json({ message: "Franchise emails sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Error sending franchise emails", error: error.message });
  }
}
