import { Doctor } from "../models/doctor.model.js";
import cloudinary from "../lib/cloudinary.js";

export const registerDoctor = async (req, res) => {
  try {
    const {
      fullName,
      specialization,
      experience,
      availableDays,
      availableFrom,
      availableTo,
    } = req.body;

    const parsedAvailableDays = availableDays ? JSON.parse(availableDays) : [];

    let profileImage = "";

    const doctor = await Doctor.findOne({ fullName });
    if (doctor) {
      return res.status(400).json({ message: "Doctor with this name already exists" });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "easycare/doctors",
      });
      profileImage = result.secure_url;
    }

    const newDoctor = await Doctor.create({
      fullName,
      specialization,
      experience,
      availableDays: parsedAvailableDays,
      availableFrom,
      availableTo,
      profileImage,
    });

    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find(); // You can add filters, pagination later
    res.status(200).json(doctors);
  } catch (error) {
    console.error('❌ Error fetching doctors:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};

export const getDoctorsById = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    res.status(500).json({ error: 'Failed to fetch doctor' });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { fullName, specialization, experience, availableDays, availableFrom, availableTo } = req.body;

    let parsedAvailableDays;

    if (typeof availableDays === 'string') {
      try {
      parsedAvailableDays = availableDays ? JSON.parse(availableDays) : [];
    } catch (error) {
      parsedAvailableDays = availableDays.split(",").map((d) => d.trim());
    }
    } else {
      parsedAvailableDays = availableDays || [];
    }

    let profileImage = "";
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (req.file) {
      if (doctor.profileImage) {
        // Delete old image from cloudinary
        const publicId = doctor.profileImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`easycare/doctors/${publicId}`);
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "easycare/doctors",
      }),
      profileImage = result.secure_url;
    } else {
      profileImage = doctor.profileImage; // Keep the old image if no new one is uploaded
    }

    const updateDoctor = await Doctor.findByIdAndUpdate(doctorId, {
      fullName,
      specialization,
      experience,
      availableDays: parsedAvailableDays,
      availableFrom,
      availableTo,
      profileImage,
    }, { new: true });

    res.status(200).json({
      message: "Doctor updated successfully",
      doctor: updateDoctor
    })
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ error: 'Failed to update doctor' });
  }
}

export const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    // Delete profile image from cloudinary
    if (doctor.profileImage) {
      const publicId = doctor.profileImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`easycare/doctors/${publicId}`);
    }

    await Doctor.findByIdAndDelete(doctorId);

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'Failed to delete doctor' });
  }
}