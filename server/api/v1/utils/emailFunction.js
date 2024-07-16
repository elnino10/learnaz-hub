import nodemailer from 'nodemailer';

// Transporter using SMTP
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
});

export const sendEmail = async (emailOptions) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailOptions.email,
            subject: emailOptions.subject,
            html: emailOptions.content
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};
