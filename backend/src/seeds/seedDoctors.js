// seedDoctors.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Doctor } from '../models/doctor.model.js'

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/easycare';

const doctors = [
  {
    fullName: "Dr. John Green",
    specialization: "general_physician",
    experience: 15,
    rating: 4.7,
    availableDays: ["Mon", "Wed", "Fri"],
    availableFrom: "09:00 AM",
    availableTo: "05:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050389/doc1_ycnjov.png",
    isActive: true,
  },
  {
    fullName: "Dr. Leila Cameron",
    specialization: "dermatology",
    experience: 10,
    rating: 4.5,
    availableDays: ["Tue", "Thu"],
    availableFrom: "09:00 AM",
    availableTo: "04:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752049986/doc2_jxedpc.png",
    isActive: true,
  },
  {
    fullName: "Dr. David Livingston",
    specialization: "general_physician",
    experience: 12,
    rating: 4.6,
    availableDays: ["Mon", "Tue", "Fri"],
    availableFrom: "08:00 AM",
    availableTo: "01:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752049987/doc3_e7f78o.png",
    isActive: false,
  },
  {
    fullName: "Dr. Evan Peter",
    specialization: "gynecology",
    experience: 9,
    rating: 4.3,
    availableDays: ["Mon", "Thu"],
    availableFrom: "11:00 AM",
    availableTo: "03:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752049991/doc4_flm59y.png",
    isActive: true,
  },
  {
    fullName: "Dr. Jane Powell",
    specialization: "neurology",
    experience: 14,
    rating: 4.8,
    availableDays: ["Wed", "Fri"],
    availableFrom: "09:30 AM",
    availableTo: "02:30 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050000/doc5_kk3lul.png",
    isActive: true,
  },
  {
    fullName: "Dr. Alex Ramirez",
    specialization: "gastroenterology",
    experience: 11,
    rating: 4.4,
    availableDays: ["Tue", "Thu", "Sat"],
    availableFrom: "10:00 AM",
    availableTo: "03:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050002/doc6_s5nvuk.png",
    isActive: false,
  },
  {
    fullName: "Dr. Sebastian Müller",
    specialization: "dermatology",
    experience: 13,
    rating: 4.6,
    availableDays: ["Mon", "Wed"],
    availableFrom: "09:00 AM",
    availableTo: "12:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050215/doc7_cusc8d.png",
    isActive: true,
  },
  {
    fullName: "Dr. Nathaniel Brooks",
    specialization: "gynecology",
    experience: 11,
    rating: 4.5,
    availableDays: ["Tue", "Fri"],
    availableFrom: "10:00 AM",
    availableTo: "01:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050014/doc8_jccq3n.png",
    isActive: false,
  },
  {
    fullName: "Dr. Alyana Cruz",
    specialization: "pediatrics",
    experience: 7,
    rating: 4.2,
    availableDays: ["Tue", "Fri"],
    availableFrom: "11:00 AM",
    availableTo: "04:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050018/doc9_ze1mwu.png",
    isActive: true,
  },
  {
    fullName: "Dr. Hardik Sharma",
    specialization: "neurology",
    experience: 10,
    rating: 4.5,
    availableDays: ["Mon", "Thu"],
    availableFrom: "10:30 AM",
    availableTo: "02:30 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050024/doc10_dpyjwz.png",
    isActive: false,
  },
  {
    fullName: "Dr. Priya Kaur",
    specialization: "pediatrics",
    experience: 8,
    rating: 4.3,
    availableDays: ["Wed", "Sat"],
    availableFrom: "09:00 AM",
    availableTo: "01:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050027/doc11_bvvnhw.png",
    isActive: true,
  },
  {
    fullName: "Dr. Rajat Mehra",
    specialization: "gastroenterology",
    experience: 9,
    rating: 4.4,
    availableDays: ["Tue", "Thu"],
    availableFrom: "08:30 AM",
    availableTo: "02:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050277/doc12_fp8n1v.png",
    isActive: true,
  },
  {
    fullName: "Dr. Meena Sethi",
    specialization: "gynecology",
    experience: 12,
    rating: 4.6,
    availableDays: ["Mon", "Wed"],
    availableFrom: "09:00 AM",
    availableTo: "05:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050032/doc13_bzwoie.png",
    isActive: false,
  },
  {
    fullName: "Dr. Karan Das",
    specialization: "general_physician",
    experience: 6,
    rating: 4.1,
    availableDays: ["Mon", "Fri"],
    availableFrom: "09:00 AM",
    availableTo: "12:30 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050035/doc14_t9j2hn.png",
    isActive: true,
  },
  {
    fullName: "Dr. Sneha Roy",
    specialization: "dermatology",
    experience: 10,
    rating: 4.5,
    availableDays: ["Tue", "Thu"],
    availableFrom: "11:00 AM",
    availableTo: "04:00 PM",
    profileImage: "https://res.cloudinary.com/dt8lfhjwm/image/upload/v1752050038/doc15_aatvhp.png",
    isActive: true,
  }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Doctor.deleteMany({});
    await Doctor.insertMany(doctors);
    console.log('✅ Doctors seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding doctors:', error);
    process.exit(1);
  }
};

seedDoctors();
