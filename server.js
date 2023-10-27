const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAPAUTH,
    pass: process.env.MAILTRAPKEY,
  },
});

app.post("https://portfoliobackend-ldhj.onrender.com/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: "David.Wright.Developer@gmail.com",
      subject: `New message from ${name}`,
      text: message,
    });

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
