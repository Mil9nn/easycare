import DoctorCard from "@/components/doctor/DoctorCard";
import { useAdminStore } from "@/hooks/useAdminStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AppointmentPage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const patient = useFormStore((state) => state.patient);

  const handleClick = (doctor: CreateDoctorParams) => {
    if (!user) {
      toast.error("Please login to continue");
      return navigate("/login");
    } else if (!patient) {
      toast.error("You need to register as a patient first");
    }
    navigate("/book-appointment", {
      state: {
        doctor: {
          name: doctor.fullName,
          specialization: doctor.specialization,
        },
        schedule: {
          date: selectedDate?.toISOString(),
          time: selectedTime?.toISOString(),
        },
      },
    });
  };

  const { doctorId } = useParams();

  const getDoctorById = useAdminStore((state) => state.getDoctorById);
  const doctor = useAdminStore((state) => state.doctor);
  const doctors = useAdminStore((state) => state.doctors);

  useEffect(() => {
    getDoctorById(doctorId || "");
  }, [getDoctorById, doctorId]);

  const relatedDoctors = doctors?.filter(
    (doc) =>
      doc._id !== doctorId && doc.specialization === doctor?.specialization
  );

  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  const canBook = selectedDate && selectedTime;

  return (
    <div className="relative min-h-screen">
      <div className="relative min-h-screen bg-gradient-to-br from-zinc-100 via-white to-zinc-200 text-white px-6 py-10">
        <div className="absolute top-0 left-0 w-[50%] h-full bg-blue-500/10"></div>
        <div className="absolute bottom-0 right-0 w-[50%] h-full bg-pink-500/10"></div>

        {/* Doctor Info */}
        {doctor && (
          <div className="relative grid lg:grid-cols-2 gap-12 items-start mb-20">
            <div className="space-y-5">
              {/* "/assets/doctors/doctor-riya.jpg" */}
              <img
                src={
                  Array.isArray(doctor.profileImage) ? URL.createObjectURL(new Blob(doctor.profileImage)) : doctor.profileImage
                }
                alt="Dr. Ananya Sharma"
                width={550}
                height={500}
                className="object-contain max-h-80 shadow-xl shadow-black/40"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {doctor?.fullName}
              </h1>

              {/* Keep specialization pink */}
              <p className="text-pink-500 font-medium capitalize">
                {doctor.specialization}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                MBBS, MD ({doctor.specialization})
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Experience: {doctor?.experience}+ years
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                "Dr. Sharma is a highly experienced cardiologist specializing in
                preventive heart care, advanced diagnostics, and minimally
                invasive treatments."
              </p>
              <p className="text-gray-500 dark:text-gray-400 italic">
                Availability:{" "}
                <div className="inline-flex flex-wrap gap-2">
                  {doctor.availableDays.map((day, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-pink-200 text-gray-700 rounded-full"
                    >
                      {day}
                    </span>
                  ))}
                </div>{" "}
                | {doctor.availableFrom} - {doctor.availableTo}
              </p>
            </div>
          </div>
        )}

        {/* Date & Time Pickers */}
        <div className="max-w-6xl mx-auto bg-white/5 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-black">
            Select a date and time for your consultation
          </h2>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <ThemeProvider theme={darkTheme}>
                <StaticDatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  className="text-black"
                />
                <StaticTimePicker
                  value={selectedTime}
                  onChange={(newValue) => setSelectedTime(newValue)}
                />
              </ThemeProvider>
            </div>
          </LocalizationProvider>
        </div>

        {/* Floating Book Appointment Button */}
        {canBook && (
          <div className="fixed bottom-25 right-6">
            <button
              onClick={() => handleClick(doctor || ({} as CreateDoctorParams))}
              className="relative group overflow-hidden px-8 py-4 bg-pink-600 text-lg font-bold rounded-full shadow-lg cursor-pointer"
            >
              <span className="relative z-20">Proceed</span>

              {/* expanding circle */}
              <span
                className="absolute left-1/2 top-1/2 w-0 h-1/2 bg-purple-500 rounded-full z-10 
                -translate-x-1/2 -translate-y-1/2 
                transition-all duration-1000 ease-in-out 
                group-hover:w-[100%] group-hover:h-[100%]"
              ></span>
            </button>
          </div>
        )}
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Related Doctors */}
        <div className="mt-16">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-700 mb-1">
              Related Doctors
            </h2>
            <p className="text-sm text-gray-500">
              Simply browse through our extensive list of trusted doctors.
            </p>
          </div>

          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 p-1 mt-5">
            {relatedDoctors?.map((relatedDoctor) => (
              <DoctorCard
                key={relatedDoctor._id}
                name={relatedDoctor.fullName}
                specialization={relatedDoctor.specialization}
                imageSrc={relatedDoctor.profileImage}
                className="bg-white shadow hover:shadow-lg hover:scale-105 transition-transform rounded-xl overflow-hidden"
                doctorId={relatedDoctor._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
