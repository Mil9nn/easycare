import { useAdminStore } from "@/hooks/useAdminStore";
import DoctorCard from "./DoctorCard";
import { Loader } from "lucide-react";
import { useState } from "react";

const AllDoctors = () => {
  const doctors = useAdminStore((state) => state.doctors);
  const gettingDoctors = useAdminStore((state) => state.gettingDoctors);

  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const filteredDoctors = selectedSpecialization
    ? doctors?.filter(
        (doctor) =>
          doctor.specialization.toLowerCase() ===
          selectedSpecialization.toLowerCase()
      )
    : doctors;

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Available Doctors</h1>
      <p className="text-gray-600 mb-5">
        Find the best doctors available for your health needs.
      </p>
      {gettingDoctors ? (
        <div className="flex items-center text-teal-400 justify-center gap-1">
          <Loader className="animate-spin" />
          <p className="text-center text-sm text-gray-500">
            Loading doctors...
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 p-1 max-w-6xl mx-auto">
          {filteredDoctors?.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              name={doctor.fullName}
              specialization={doctor.specialization}
              imageSrc={doctor.profileImage}
              className="bg-teal-200"
              doctorId={doctor._id}
              isActive={doctor.isActive}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllDoctors;
