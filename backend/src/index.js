import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routes/auth.route.js'
import patientRoutes from './routes/patient.route.js'
import appointmentRoutes from './routes/appointment.route.js';
import adminRoutes from './routes/admin.route.js'

import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
})
