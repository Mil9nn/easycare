import { useAdminStore } from "@/hooks/useAdminStore";
import DoctorCard from "./DoctorCard";
import { Loader } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Specializations } from "./form/constants";
import type { ChangeEvent } from "react";

const AllDoctors = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const specialization = searchParams.get("specialization");

  const doctors = useAdminStore((state) => state.doctors);
  const gettingDoctors = useAdminStore((state) => state.gettingDoctors);

  const filteredDoctors = specialization
    ? doctors?.filter(
        (doctor) =>
          doctor.specialization.toLowerCase() === specialization?.toLowerCase()
      )
    : doctors;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "all") {
      navigate("/doctors"); // Navigate without filters
    } else {
      navigate(`/doctors?specialization=${selectedValue}`);
    }
  };

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Available Doctors</h1>
      <p className="text-gray-600 mb-5">
        Find the best doctors available for your health needs.
      </p>
      <div className="mb-4">
        <label
          htmlFor="specialization"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filter by Specialization
        </label>
        <select
          id="specialization"
          onChange={handleChange}
          value={specialization || "all"}
          className="block w-full cursor-pointer p-2 border border-gray-300 outline-teal-500 max-w-sm rounded-md shadow-sm focus:ring-indigo-500 focus:border-teal-500 text-sm"
        >
          {Specializations.map((spec) => (
            <option key={spec.value} value={spec.value}>
              {spec.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-sm text-indigo-500 font-medium mb-2">
          {specialization
            ? `Showing doctors specialized in ${specialization}`
            : "Showing all doctors"}
        </p>
      </div>
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
