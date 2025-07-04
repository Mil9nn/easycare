import express from 'express';
import {
  createAppointment,
  updateAppointment,
  getAppointmentById,
  getAllAppointments,
} from '../controllers/appointment.controller.js';
import { protectAdmin } from '../middleware/admin.middleware.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createAppointment);         // POST /api/appointment
router.put('/', protectRoute, updateAppointment);          // PUT /api/appointment
router.get('/', protectAdmin, getAllAppointments);
router.get('/:id', protectAdmin, getAppointmentById);      // GET /api/appointment/:id

export default router;