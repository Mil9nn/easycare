import express from 'express'
import { createPatient, getMyPatient, getPatientById, getPatients, updatePatient } from '../controllers/patient.controller.js';
import { upload } from '../middleware/upload.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/', protectRoute, upload.single("identificationDocument"), createPatient);
router.get('/', protectRoute,  getPatients);
router.get('/me', protectRoute, getMyPatient);
router.get('/:id', protectRoute, getPatientById);
router.put('/update/:id', protectRoute, upload.single("identificationDocument"), updatePatient);

export default router;