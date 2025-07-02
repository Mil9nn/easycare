import express from 'express'
import { createPatient, getPatientById, getPatients, updatePatient } from '../controllers/patient.controller.js';
import { upload } from '../middleware/upload.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/', upload.single("identificationDocument"), createPatient);
router.get('/', protectRoute,  getPatients);
router.get('/:id', protectRoute, getPatientById);
router.put('/update/:id', protectRoute, upload.single("identificationDocument"), updatePatient);

export default router;