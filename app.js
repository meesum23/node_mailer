// console.log("App is working");
const express = require('express');
const nodemailer = require('nodemailer');
const PORT = 5000;
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "meesum.24aug24webgpt@gmail.com", // Use the same email here
        pass: "ppea gfom fmlz djnh" // Your app password
    },
});

// Generate OTP
function OTPgeneration() {
    return Math.floor(1000 + Math.random() * 999999).toString(); // 4-digit OTP generation
}

// API Route to send OTP
app.post("/send-otp", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Please provide email" });
    }

    // Generate OTP
    const otp = OTPgeneration();
    
    try {
        await transporter.sendMail({
            from: "meesum.24aug24webgpt@gmail.com", // Make sure to use the correct email
            to: email,
            subject: "OTP for registration",
            text: `Your OTP is ${otp}`  
        });

        return res.status(200).json({
            message: `OTP sent successfully: ${otp}` // Corrected variable usage
        });
    } catch (err) {
        console.error("Error sending email:", err); // Log the error for debugging
        return res.status(500).json({
            message: "Failed to send OTP"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
