import express from 'express';
import { checkAdmin, getAppointmentStats, logoutAdmin, scheduleAppointment, verifyAdminOtp } from '../controllers/admin.controller.js';
import { protectAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.post('/verify-otp', verifyAdminOtp);
router.post('/logout', protectAdmin, logoutAdmin);
router.get('/check', protectAdmin, checkAdmin);
router.put('/appointment/schedule', protectAdmin, scheduleAppointment);
router.get("/appointment/stats", protectAdmin, getAppointmentStats);


export default router;