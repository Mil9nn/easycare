import express from 'express'
import { createPatient, getPatientById, getPatients } from '../controllers/patient.controller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single("identificationDocument"), createPatient);
router.get('/', getPatients);
router.get('/:id', getPatientById);

export default router;