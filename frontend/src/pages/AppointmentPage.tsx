import DoctorCard from "@/components/doctor/DoctorCard";
import { useAdminStore } from "@/hooks/useAdminStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { Dayjs } from "dayjs";

const AppointmentPage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const patient = useFormStore((state) => state.patient);

  const { doctorId } = useParams();
  const getDoctorById = useAdminStore((state) => state.getDoctorById);
  const doctor = useAdminStore((state) => state.doctor);
  const doctors = useAdminStore((state) => state.doctors);

  useEffect(() => {
    getDoctorById(doctorId || "");
  }, [doctorId, getDoctorById]);

  const relatedDoctors = doctors?.filter(
    (doc) =>
      doc._id !== doctorId && doc.specialization === doctor?.specialization
  );

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const canBook = selectedDate && selectedTime;

  const darkTheme = createTheme({
    palette: { mode: "light", primary: { main: "#2563EB" } },
  });

  const handleClick = (doctor: CreateDoctorParams) => {
    if (!user) {
      toast.error("Please login to continue");
      return navigate("/login");
    } else if (!patient) {
      toast.error("You need to register as a patient first");
      return;
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Doctor Section */}
      {doctor && (
        <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center">
            <img
              src={
                Array.isArray(doctor.profileImage)
                  ? URL.createObjectURL(new Blob(doctor.profileImage))
                  : doctor.profileImage
              }
              alt={doctor.fullName}
              className="rounded-2xl shadow-md border border-gray-200 object-cover w-[90%] max-w-md"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              {doctor.fullName}
            </h1>
            <p className="text-blue-600 font-medium capitalize text-lg">
              {doctor.specialization}
            </p>

            <p className="text-gray-600">
              MBBS, MD ({doctor.specialization})
            </p>
            <p className="text-gray-600">
              Experience: {doctor.experience}+ years
            </p>
            <p className="text-gray-600 leading-relaxed">
              Expert healthcare professional specializing in{" "}
              {doctor.specialization}. Choose your preferred date and time to
              schedule a consultation.
            </p>

            <div>
              <span className="font-medium text-gray-700">Availability:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {doctor.availableDays.map((day, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                  >
                    {day}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {doctor.availableFrom} – {doctor.availableTo}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Date & Time Picker Section */}
      <section className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900">
            Select Date & Time
          </h2>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={darkTheme}>
              <div className="flex flex-col lg:flex-row gap-10 justify-between items-center">
                <StaticDatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                />
                <StaticTimePicker
                  value={selectedTime}
                  onChange={(newValue) => setSelectedTime(newValue)}
                />
              </div>
            </ThemeProvider>
          </LocalizationProvider>
        </div>
      </section>

      {/* Proceed Button */}
      {canBook && (
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => handleClick(doctor || ({} as CreateDoctorParams))}
            className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Proceed
          </button>
        </div>
      )}

      {/* Related Doctors */}
      {relatedDoctors?.length && relatedDoctors?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Related Doctors
            </h2>
            <p className="text-gray-500 text-sm">
              You might also be interested in these specialists.
            </p>
          </div>

          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {relatedDoctors.map((relatedDoctor) => (
              <DoctorCard
                key={relatedDoctor._id}
                name={relatedDoctor.fullName}
                specialization={relatedDoctor.specialization}
                imageSrc={relatedDoctor.profileImage}
                className="bg-white border border-gray-200 rounded-xl hover:shadow-md transition"
                doctorId={relatedDoctor._id}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AppointmentPage;
