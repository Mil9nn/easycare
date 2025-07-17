import express from 'express';
import {
  createAppointment,
  updateAppointment,
  getAppointmentById,
  getAllAppointments,
  getAllAppointmentsByPatient,
} from '../controllers/appointment.controller.js';
import { protectAdmin } from '../middleware/admin.middleware.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createAppointment); 
router.put('/', protectRoute, updateAppointment);          
router.get('/', protectAdmin, getAllAppointments);
router.get('/:id', protectAdmin, getAppointmentById);      
router.get('/patient/:id', protectRoute, getAllAppointmentsByPatient);

export default router;