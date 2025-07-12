
import DoctorCard from "@/components/DoctorCard";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/hooks/useAdminStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

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

  const relatedDoctors = doctors?.filter((doc) => (
    doc._id !== doctorId && doc.specialization === doctor?.specialization
  ))

  return (
    <div className="p-10 sm:p-6 bg-white shadow-sm">
      {doctor && (
        <div className="flex flex-col sm:flex-row sm:items-start gap-1">
          <div className="bg-indigo-500 rounded w-full max-w-70">
            <img
              src={
                Array.isArray(doctor.profileImage)
                  ? URL.createObjectURL(doctor.profileImage[0])
                  : doctor.profileImage
              }
              alt={doctor.fullName}
              className="w-80 h-70 object-contain"
            />
          </div>
          <div className="flex flex-col space-y-3 py-3 p-5">
            <h3 className="text-xl font-semibold text-gray-800">
              {doctor.fullName}
            </h3>
            <div className="flex items-center gap-3">
              <p className="text-md capitalize text-gray-600 pb-1">
                MBBS - {doctor.specialization}
              </p>
              <p className="text-xs text-gray-600 bg-primary border border-gray-300 p-1 rounded-full w-fit">
                {doctor.experience} years
              </p>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Available:</span>{" "}
              {doctor.availableDays.map((day, index) => (
                <span
                  key={index}
                  className="bg-[#009689] capitalize text-xs font-medium mr-2 rounded text-white px-2 p-1"
                >
                  {day}
                </span>
              ))}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Time:</span>
              <span className="text-xs text-white font-medium bg-indigo-400 rounded p-1">
                {doctor.availableFrom} – {doctor.availableTo}
              </span>{" "} 
            </p>
            <p className="max-w-[700px]  text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod magna vel magna tincidunt, ac malesuada lorem eleifend.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod magna vel magna tincidunt, ac malesuada lorem eleifend.
            </p>

            <Button onClick={() => {handleClick(doctor)}} className="self-start sm:self-end rounded-full bg-indigo-500 text-white hover:bg-indigo-700 transition-colors cursor-pointer">
              Book appointment
            </Button>
          </div>
        </div>
      )}

      <div className="">
        <div className="flex flex-col items-center mt-10">
          <h2 className="text-gray-600 mb-2 font-medium">Related Doctors</h2>
          <p className="text-sm text-gray-500 max-w-xs">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>
        <div className="grid lg:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 p-1 max-w-6xl mx-auto mt-4">
            {relatedDoctors?.map((relatedDoctor) => (
                <DoctorCard
                    key={relatedDoctor._id}
                    name={relatedDoctor.fullName}
                    specialization={relatedDoctor.specialization}
                    imageSrc={relatedDoctor.profileImage}
                    className="bg-teal-200"
                    doctorId={relatedDoctor._id}
                 />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
