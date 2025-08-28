import { useAdminStore } from "@/hooks/useAdminStore";
import DoctorCard from "../doctor/DoctorCard";
import { Loader, Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Specializations } from "../form/constants";
import { type ChangeEvent } from "react";

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
    <section className="max-sm:p-0 p-10">
      <div className="relative min-h-screen px-6 py-10 space-y-12">
        {/* Intro */}
        <header className="mx-auto space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            Our Trusted Doctors
          </h1>
          <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
            Choose from our expert doctors, select a convenient time slot, and
            confirm your visit — all in just a few clicks. Your health,
            simplified.
          </p>
        </header>

        <section className="flex max-xs:flex-col-reverse justify-between gap-5 max-w-2xl">
          {/* Search Bar */}
          <div className="relative w-full max-w-xl">
            <input
              type="search"
              placeholder="Search by doctor name or specialty…"
              className="w-full pl-12 pr-4 py-3 rounded-full 
              bg-white/10 border border-white/20 
              backdrop-blur-md shadow-md shadow-black/40
              text-gray-500 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Specialization Filter */}
          <div className="w-full max-w-[150px]">
            <select
              id="specialization"
              onChange={handleChange}
              value={specialization || "all"}
              className="w-full py-3 bg-white/10 border border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer p-2 outline-blue-500 max-w-sm rounded-md shadow-sm text-sm"
            >
              {Specializations.map((spec) => (
                <option key={spec.value} value={spec.value}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        <div>
          <p className="flex flex-col gap-1">
            <span className="text-indigo-500 text-2xl font-semibold">
              {specialization
                ? `Showing doctors specialized in ${specialization}`
                : "Showing all doctors"}
            </span>
            <span className="text-gray-500 text-md font-normal">
              Click on a doctor for more details...
            </span>
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
          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 p-1">
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
      </div>
    </section>
  );
};

export default AllDoctors;
