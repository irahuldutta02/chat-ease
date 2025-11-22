import nodemailer from "nodemailer";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";
import { ENV } from "../lib/env.js";

const host = ENV.EMAIL_HOST;
const port = ENV.EMAIL_PORT;
const secure = port === 465;
const user = ENV.EMAIL_USERNAME;
const pass = ENV.EMAIL_PASSWORD;
const fromEmail = ENV.EMAIL_USERNAME;
const fromName = "ChatEase";

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: {
    user,
    pass,
  },
});

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const info = await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: email,
      subject: "Welcome to ChatEase!",
      html: createWelcomeEmailTemplate(name, clientURL),
    });

    console.log("Welcome Email sent successfully", info);
    return info;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
