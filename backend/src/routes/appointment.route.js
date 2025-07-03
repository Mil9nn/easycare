import express from 'express';
import {
  createAppointment,
  updateAppointment,
  getAppointmentById,
} from '../controllers/appointment.controller.js';

const router = express.Router();

router.post('/', createAppointment);         // POST /api/appointment
router.put('/', updateAppointment);          // PUT /api/appointment
router.get('/:id', getAppointmentById);      // GET /api/appointment/:id

export default router;