# EasyCare - Healthcare Appointment Management System

A healthcare appointment management platform that streamlines the process of booking, managing, and tracking medical appointments. Built with React, TypeScript, Node.js, and MongoDB.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.0-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 👤 Patient Portal
- **User Authentication** - Secure signup/login system with JWT
- **Medical Profile Management** - Comprehensive patient information storage including:
  - Personal details
  - Medical history
  - Current medications
  - Allergies
  - Insurance information
  - Emergency contacts
- **Appointment Booking** - Browse doctors by specialization and book appointments
- **Appointment History** - Track all past and upcoming appointments
- **AI Symptom Checker** - Get preliminary medical insights based on symptoms
- **Real-time Updates** - Live appointment status updates via WebSocket

### 👨‍⚕️ Doctor Management
- **Doctor Profiles** - Detailed profiles with specializations and experience
- **Specialization Filtering** - Browse doctors by 8+ specializations:
  - Gastroenterology
  - Dermatology
  - General Physician
  - Gynecology
  - Neurology
  - Pediatrics
  - And more
- **Availability Scheduling** - Configure working days and hours
- **Profile Management** - Upload and manage doctor photos via Cloudinary
- **Status Toggle** - Mark doctors as active/inactive

### 🔐 Admin Dashboard
- **OTP Authentication** - Secure admin access with 6-digit OTP
- **Appointment Management** - Schedule, approve, or cancel appointments
- **Real-time Analytics Dashboard** with:
  - Weekly appointment trends (Line Chart)
  - Status distribution (Pie Chart)
  - Patient demographics by age group (Bar Chart)
  - Live statistics cards
- **Doctor Management** - Full CRUD operations for doctors
- **Patient Overview** - View detailed patient information and medical history
- **Email Notifications** - Automated emails for appointment confirmations/cancellations

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Socket.io Client** - Real-time communication
- **Recharts** - Data visualization
- **Material UI** - Date/time pickers
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** + **Express** - Server framework
- **MongoDB** + **Mongoose** - Database and ODM
- **Socket.io** - WebSocket server for real-time updates
- **JWT** - JSON Web Token authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Cloud-based image storage
- **Nodemailer** - Email service integration
- **OpenAI API** - AI-powered symptom checker
- **Multer** - Multipart/form-data file upload
- **Moment.js** - Date manipulation
- **CORS** - Cross-Origin Resource Sharing

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Cloudinary account
- Gmail account (for email notifications)
- OpenAI API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/easyycare.git
cd easycare
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Set Up Environment Variables

See [Environment Variables](#-environment-variables) section below.

### 5. Run the Application

**Start Backend (from backend directory):**
```bash
npm run dev
```

**Start Frontend (from frontend directory):**
```bash
npm run dev
```

The application will be available at:
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:5000`

## 🔐 Environment Variables

### Backend (.env in /backend)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=
# Or use MongoDB Atlas:
# MONGO_URI=

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Admin Configuration
ADMIN_SECRET_OTP=123456

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (Gmail)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@easycare.com

# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key
```

### Setting Up Email (Gmail)

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password:
   - Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password
4. Use this password in `EMAIL_PASS`

### Getting API Keys

- **Cloudinary:** Sign up at [cloudinary.com](https://cloudinary.com)
- **OpenAI:** Get API key from [platform.openai.com](https://platform.openai.com)

## 📂 Project Structure
```
easycare/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   │   ├── admin.controller.js
│   │   │   ├── appointment.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── chatbot.controller.js
│   │   │   ├── doctor.controller.js
│   │   │   └── patient.controller.js
│   │   ├── models/             # Mongoose schemas
│   │   │   ├── appointment.model.js
│   │   │   ├── doctor.model.js
│   │   │   ├── patient.model.js
│   │   │   └── user.model.js
│   │   ├── routes/             # API routes
│   │   │   ├── admin.route.js
│   │   │   ├── appointment.route.js
│   │   │   ├── auth.route.js
│   │   │   ├── chatbot.route.js
│   │   │   ├── doctor.route.js
│   │   │   └── patient.route.js
│   │   ├── middleware/         # Middleware functions
│   │   │   ├── admin.middleware.js
│   │   │   ├── auth.middleware.js
│   │   │   └── upload.js
│   │   ├── lib/                # Utilities
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── jwt.js
│   │   │   ├── nodemailer.js
│   │   │   ├── openai.mjs
│   │   │   └── socket.js
│   │   ├── helpers/            # Helper functions
│   │   │   ├── emitStats.js
│   │   │   └── utils.js
│   │   └── index.js            # Entry point
│   ├── public/
│   │   └── uploads/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── analytics/
│   │   │   ├── authentication/
│   │   │   ├── chat/
│   │   │   ├── custom/
│   │   │   ├── doctor/
│   │   │   ├── form/
│   │   │   ├── navbar/
│   │   │   ├── table/
│   │   │   └── ui/
│   │   ├── pages/              # Page components
│   │   │   ├── admin/
│   │   │   ├── AppointmentPage.tsx
│   │   │   ├── BookAppointment.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── SuccessPage.tsx
│   │   ├── hooks/              # Custom hooks
│   │   │   ├── useAdminStore.tsx
│   │   │   ├── useAppointmentStore.tsx
│   │   │   ├── useAuthStore.tsx
│   │   │   ├── useChatStore.tsx
│   │   │   └── useFormStore.tsx
│   │   ├── lib/                # Utilities
│   │   │   ├── axios.ts
│   │   │   ├── socket.ts
│   │   │   ├── utils.ts
│   │   │   └── validation.ts
│   │   ├── layout/             # Layout components
│   │   │   ├── AdminLayout.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── types/              # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   │   └── assets/
│   ├── package.json
│   └── .env
│
├── .gitignore
├── LICENSE
└── README.md
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
```bash
   git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
   git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
   git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Email notifications may have delays during high traffic
- AI symptom checker requires OpenAI API quota
- Image uploads limited to 10MB
