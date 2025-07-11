import express from "express";
import multer from "multer";
import { deleteDoctor, getAllDoctors, getDoctorById, registerDoctor, updateDoctor } from "../controllers/doctor.controller.js";
import { protectAdmin } from "../middleware/admin.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // use memoryStorage() for buffer

router.post("/add", protectAdmin, upload.single("profileImage"), registerDoctor);
router.get("/all", getAllDoctors);
router.get("/:doctorId", getDoctorById);
router.put("/:doctorId", protectAdmin, upload.single("profileImage"), updateDoctor);
router.delete("/:doctorId", protectAdmin, deleteDoctor);

export default router;
