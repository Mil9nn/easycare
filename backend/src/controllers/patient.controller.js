import { Patient } from "../models/patient.model.js";
import cloudinary from '../lib/cloudinary.js';

export const createPatient = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check if patient already exists for this user
        const existingPatient = await Patient.findOne({ user: userId });
        if (existingPatient) {
            return res.status(400).json({ message: "Patient already exists for this user" });
        }

        const { fullName, email, phone, birthDate, gender, address, occupation, emergencyContactName,
            emergencyContactNumber, insuranceProvider, insurancePolicyNumber,
            allergies, currentMedication, familyMedicalHistory, pastMedicalHistory,
            identificationType, identificationNumber, treatmentConsent, disclosureConsent,
            privacyConsent, fileName } = req.body;


        // upload file to cloudinary
        if (!req.file) {
            return res.status(400).json({ message: "Identification document is required" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        const fileUrl = result.secure_url;

        const newPatient = await Patient.create({
            user: userId,
            ...req.body,
            identificationDocument: {
                fileName,
                fileUrl,
            },
            consents: {
                treatmentConsent: req.body.treatmentConsent,
                disclosureConsent: req.body.disclosureConsent,
                privacyConsent: req.body.privacyConsent,
            }
        })

        res.status(201).json({
            success: true,
            message: "Patient created successfully",
            patient: newPatient,
        })
    } catch (error) {
        console.error("Erorr creating patient:", error);
        res.status(500).json({ messsage: "Internal server error" });
    }
}

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.status(200).json({
            patients,
        })
    } catch (error) {

    }
}

export const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({
            patient,
        })
    } catch (error) {
        console.error("Error fetching patient:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // check if patient exists
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        for (const key in updates) {
            if (key in patient) {
                patient[key] = updates[key];
            }
        }

        if (req.file) {
            const fileUrl = `/uploads/${req.file.filename}`;
            patient.identificationDocument = {
                fileName: req.file.originalname,
                fileUrl: fileUrl,
            };
        }

        // Save the updated patient
        const updatedPatient = await patient.save();

        res.status(200).json({
            success: true,
            message: "Patient updated successfully",
            patient: updatedPatient,
        });
    } catch (error) {
        console.error("Error updating patient:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMyPatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({ user: req.user._id });
        if (!patient) {
            return res.status(404).json({ message: "No patient profile found for this user" });
        }

        res.status(200).json({ patient });
    } catch (error) {
        console.error("Error in getMyPatient:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}