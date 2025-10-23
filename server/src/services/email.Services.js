import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const __dirname = path.resolve();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendWelcomeEmail = async (toEmail, username) => {
  try {
    const templatePath = path.join(__dirname, "src", "services", "templates", "index.html");

    let htmlContent = fs.readFileSync(templatePath, "utf8");

    htmlContent = htmlContent.replace(/{{\s*username\s*}}/g, username);

    
    const info = await transporter.sendMail({
      from: `"MoonChat-AI" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Welcome to MoonChat-AI, ${username}! 🌙`,
      html: htmlContent,
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
