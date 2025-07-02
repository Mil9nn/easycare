import { Patient } from "../models/patient.model.js";

export const createPatient = async (req, res) => {
    console.log("I'm in patient controller");
    try {
        const {
            fullName,
            email,
            phone,
            birthDate,
            gender,
            address,
            occupation,
            emergencyContactName,
            emergencyContactNumber,
            primaryPhysician,
            insuranceProvider,
            insurancePolicyNumber,
            allergies,
            currentMedication,
            familyMedicalHistory,
            pastMedicalHistory,
            identificationType,
            identificationNumber,
            treatmentConsent,
            disclosureConsent,
            privacyConsent,
            fileName,
        } = req.body;

        console.log("I've extracted the fields");

        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

        console.log(fileUrl);

        const newPatient = await Patient.create({
            fullName,
            email,
            phone,
            birthDate,
            gender,
            address,
            occupation,
            emergencyContactName,
            emergencyContactNumber,
            primaryPhysician,
            insuranceProvider,
            insurancePolicyNumber,
            allergies,
            currentMedication,
            familyMedicalHistory,
            pastMedicalHistory,
            identificationType,
            identificationNumber,
            identificationDocument: {
                fileName,
                fileUrl,
            },
            consents: {
                treatmentConsent,
                disclosureConsent,
                privacyConsent,
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

        console.log("Updates received:", updates);

        // check if patient exists
        const patient = await Patient.findById(id).select("-email -phone");
        console.log("Patient found:", patient);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        for (const key in updates) {
            console.log(`Updating ${key} with value:`, updates[key]);
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