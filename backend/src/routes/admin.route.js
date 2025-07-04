import express from 'express';
import { checkAdmin, logoutAdmin, verifyAdminOtp } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/verify-otp', verifyAdminOtp);
router.post('/logout', logoutAdmin);
router.get('/check', checkAdmin);

export default router;