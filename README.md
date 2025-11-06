# 🏥 HarmonyCare - Healthcare Appointment Management System

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
- [API Endpoints](#-api-endpoints)
- [Usage](#-usage)
- [Admin Access](#-admin-access)
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
git clone https://github.com/yourusername/harmonycare.git
cd harmonycare
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
MONGO_URI=mongodb://localhost:27017/harmonycare
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/harmonycare

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
ADMIN_EMAIL=admin@harmonycare.com

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
harmonycare/
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

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/logout` | User logout | Yes |
| GET | `/check` | Check auth status | Yes |
| PUT | `/update-profile` | Update user profile | Yes |

### Admin Routes (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/verify-otp` | Verify admin OTP | No |
| POST | `/logout` | Admin logout | Admin |
| GET | `/check` | Check admin status | Admin |
| PUT | `/appointment/schedule` | Schedule/cancel appointment | Admin |
| GET | `/appointment/stats` | Get appointment statistics | Admin |
| GET | `/appointment/weekly` | Get weekly appointments | Admin |
| GET | `/patientData` | Get patients by age group | Admin |

### Patient Routes (`/api/patient`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create patient profile | Yes |
| GET | `/` | Get all patients | Yes |
| GET | `/me` | Get current patient | Yes |
| GET | `/:id` | Get patient by ID | Yes |
| PUT | `/update/:id` | Update patient | Yes |

### Appointment Routes (`/api/appointment`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create appointment | Yes |
| PUT | `/` | Update appointment | Yes |
| GET | `/` | Get all appointments | Admin |
| GET | `/:id` | Get appointment by ID | Admin |
| GET | `/patient/:id` | Get patient appointments | Yes |

### Doctor Routes (`/api/doctor`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add` | Add new doctor | Admin |
| GET | `/all` | Get all doctors | No |
| GET | `/:doctorId` | Get doctor by ID | No |
| PUT | `/:doctorId` | Update doctor | Admin |
| PUT | `/status/:doctorId` | Toggle doctor status | Admin |
| DELETE | `/:doctorId` | Delete doctor | Admin |

### Chatbot Routes (`/api/chatbot`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/chat` | AI symptom analysis | No |

## 💻 Usage

### For Patients

1. **Sign Up / Login**
   - Create an account or login with existing credentials
   - Navigate to `/signup` or `/login`

2. **Complete Medical Profile**
   - Fill out comprehensive medical information
   - Upload identification document
   - Provide emergency contact details

3. **Book Appointment**
   - Browse doctors by specialization
   - Select preferred date and time
   - Provide reason for visit
   - Submit appointment request

4. **Track Appointments**
   - View appointment history
   - Check appointment status (Pending/Scheduled/Cancelled)
   - Receive email notifications

5. **AI Symptom Checker**
   - Describe symptoms to the chatbot
   - Get preliminary analysis
   - Recommended specialist type
   - Urgency level assessment

### For Admins

1. **Access Admin Panel**
   - Navigate to `/admin`
   - Enter OTP: `123456` (default)

2. **Dashboard Overview**
   - View real-time statistics
   - Monitor appointment trends
   - Analyze patient demographics

3. **Manage Appointments**
   - Review pending requests
   - Schedule appointments
   - Cancel appointments with reasons
   - View detailed patient information

4. **Manage Doctors**
   - Add new doctors with profiles
   - Update doctor information
   - Toggle availability status
   - Remove doctors from system

## 🔐 Admin Access

**Default Admin OTP:** `123456`

To access the admin panel:
1. Navigate to `/admin`
2. Enter the OTP
3. You'll be redirected to the admin dashboard

**Important:** Change the default OTP in production by updating the `ADMIN_SECRET_OTP` environment variable.

## 🌐 Production Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Set all environment variables
2. Update `NODE_ENV` to `production`
3. Ensure MongoDB Atlas connection string is set
4. Deploy the `/backend` directory

### Frontend Deployment (Vercel/Netlify)

1. Update API URL to production backend
2. Build the project: `npm run build`
3. Deploy the `/frontend/dist` directory

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 🧪 Testing
```bash
# Run tests (if implemented)
npm test
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

### Code Style

- Use ESLint and Prettier for code formatting
- Follow existing code conventions
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Email notifications may have delays during high traffic
- AI symptom checker requires OpenAI API quota
- Image uploads limited to 10MB

## 🔮 Future Enhancements

- [ ] Video consultation integration
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Prescription management
- [ ] Lab report uploads
- [ ] SMS notifications
- [ ] Mobile app (React Native)

## 📞 Support

For support, email support@harmonycare.com or create an issue in the repository.

## 👨‍💻 Author

**Murli Manohar Milan Singh**
- GitHub: [@Mil9nn](https://github.com/Mil9nn)
- LinkedIn: [Your Profile](https://www.linkedin.com/in/milan-singh-51351b1bb/)
- Email: singhmilan314@gmail.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [OpenAI](https://openai.com/)
- [Cloudinary](https://cloudinary.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- All open-source libraries used in this project

---

⭐ **If you find this project useful, please consider giving it a star!**

Made with ❤️ by [Murli Manohar Milan Singh]
