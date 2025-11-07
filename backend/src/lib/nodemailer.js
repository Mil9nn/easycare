import nodemailer from 'nodemailer';
import { formatDateTime } from '../helpers/utils.js';
import path from 'path';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

// function to send an email
export const sendAppointmentEmail = async (appointmentData) => {

    const { fullName, email, primaryPhysician, schedule, reason, note } = appointmentData;

    const mailOptions = {
        from: `"Easy Care App" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'EasyCare - New Appointment Request',
        html: `
            <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 20px; border-radius: 8px;">
                <img src="cid:logo-icon" alt="Easy Care Logo" width="80" style="display: block; margin-bottom: 16px;" />
                
                <h2 style="color: #111827;">New Appointment Request</h2>
                
                <p><strong>Patient:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Doctor:</strong> ${primaryPhysician}</p>
                <p><strong>Date:</strong> ${formatDateTime(schedule).dateTime}</p>
                <p><strong>Reason:</strong> ${reason}</p>
                <p><strong>Note:</strong> ${note || 'No additional notes provided'}</p>

                <hr style="margin: 20px 0;" />

                <p style="color: #374151;">
                    Please log in to the admin dashboard to <strong>approve or cancel</strong> this request.
                </p>

                <a href="https://easycare-c6rt.onrender.com/admin/"
                    style="display: inline-block; background: #2563eb; color: white; padding: 10px 16px; border-radius: 6px; text-decoration: none; margin-top: 10px;">
                    🔍 Review Appointment
                </a>

                <p style="font-size: 12px; color: gray; margin-top: 20px;">
                    This is an automated message from Easy Care. Please do not reply.
                </p>
            </div>
        `,
        attachments: [
            {
                filename: 'logo-icon.png',
                path: path.resolve('../frontend/public/assets/icons/logo-icon.png'),
                cid: 'logo-icon',
                contentDisposition: 'inline'
            }
        ]
    };

    try {
        const info = transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('❌ Error sending email to admin:', error);
    }
};


// function to send appointment confirmation email to patient
export const sendPatientEmail = async (appointmentData) => {
    const { fullName, email, primaryPhysician, schedule, status } = appointmentData;

    const subject =
        status === 'scheduled'
            ? 'Your Appointment has been scheduled'
            : 'Your Appointment has been cancelled';

    const message =
        status === 'scheduled'
            ? `
      <p>Dear ${fullName},</p>
      <p>Your appointment with <strong>${primaryPhysician}</strong> has been successfully scheduled for <strong style="color: indigo">${formatDateTime(schedule).dateTime}</strong>.</p>
      <p>Thank you for choosing Easy Care. We look forward to seeing you!</p>
    `
            : `
      <p>Dear ${fullName},</p>
      <p>We regret to inform you that your appointment with <strong>${primaryPhysician}</strong> has been <strong style="color: red" >cancelled</strong>.</p>
      <p>If you have any questions or need to reschedule, please contact us.</p>
    `;

    const mailOptions = {
        from: `"Easy Care App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        html: `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 20px; border-radius: 8px;">
        <img src="cid:logo-icon" alt="Easy Care Logo" width="80" style="display: block; margin-bottom: 16px;" />
        ${message}
        <hr style="margin: 20px 0;" />
        <p style="font-size: 12px; color: gray;">This is an automated message. Please do not reply.</p>
      </div>
    `,
        attachments: [
            {
                filename: 'logo-icon.png',
                path: path.resolve('../frontend/public/assets/icons/logo-icon.png'),
                cid: 'logo-icon',
                contentDisposition: 'inline',
            },
        ],
    };

    try {
        const info = transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('❌ Error sending patient email:', error);
    }
};
