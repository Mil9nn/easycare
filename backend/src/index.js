import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routes/auth.route.js'
import patientRoutes from './routes/patient.route.js'
import appointmentRoutes from './routes/appointment.route.js'
import adminRoutes from './routes/admin.route.js'
import chatBotRoutes from './routes/chatbot.route.js'
import doctorRoutes from "./routes/doctor.route.js"

import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

import path from 'path';

dotenv.config();

const __dirname = path.resolve();


const app = express()
const port = process.env.PORT

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chatbot', chatBotRoutes);
app.use("/api/doctor", doctorRoutes);

app.get('/', (req, res) => {
  res.send('server is running');
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Named Wildcard to match all routes (Express wildcard syntax)
  app.get('/*splat', (req, res) => {
    
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ message: 'API route not found' });
    }
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });

}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
})
