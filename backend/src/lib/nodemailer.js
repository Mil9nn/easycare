import nodemailer from 'nodemailer';
import { formatDateTime } from '../helpers/utils.js';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

// function to send an email
export const sendAppointmentEmail = async (appointmentData) => {
    console.log("Appointment Data:", appointmentData);
    console.log("user:", process.env.EMAIL_USER);
    console.log("pass:", process.env.EMAIL_PASS);

    const mailOptions = {
        from: `"Easy Care App" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Appointment Request',
        html: `
            <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 20px; border-radius: 8px;">
                <h2 style="color: #111827;">
                <img src="cid:logo" alt="Easycare logo" />
                📅
                New Appointment Request</h2>
                
                <p><strong>Patient:</strong> ${appointmentData.patient.fullName}</p>
                <p><strong>Email:</strong> ${appointmentData.patient.email}</p>
                <p><strong>Doctor:</strong> ${appointmentData.primaryPhysician}</p>
                <p><strong>Date:</strong> ${formatDateTime(appointmentData.schedule).dateTime}</p>
                <p><strong>Note:</strong> ${appointmentData.note || 'No additional notes provided'}</p>
                <p><strong>Reason:</strong> ${appointmentData.reason}</p>


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
                filename: 'logo-icon.svg',
                path: './assets/icons/logo-icon.svg',
                cid: 'logo'
            }
        ]
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
}