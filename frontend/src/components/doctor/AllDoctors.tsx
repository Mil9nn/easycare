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
    <section className="max-sm:p-0 px-10 py-5">
      <div className="relative min-h-screen px-6 py-10 space-y-12">
        {/* Intro */}
        <header className="relative mx-auto text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-rose-500 drop-shadow-lg">
            Our Trusted Doctors
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Choose from our expert doctors, select a convenient time slot, and
            confirm your visit — all in just a few clicks.
            <span className="block mt-1 font-semibold text-blue-400">
              Your health, simplified.
            </span>
          </p>
        </header>

        {/* Floating Search + Filter Bar */}
        <section className="flex flex-col sm:flex-row sm:items-center gap-4 w-[90%] max-w-3xl mx-auto bg-white border border-white/20 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg shadow-black/40 z-50">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Search by doctor name or specialty…"
              className="w-full max-w-md shadow-2xl shadow-black/70 pl-12 pr-4 py-3 rounded-full
                 bg-transparent border border-white/20
                 text-gray-200 placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Specialization Filter */}
          <div className="w-44">
            <select
              id="specialization"
              onChange={handleChange}
              value={specialization || "all"}
              className="w-full py-3 px-3 rounded-xl cursor-pointer
                 bg-transparent border  border-black
                 text-gray-500 backdrop-blur-md
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {Specializations.map((spec) => (
                <option
                  key={spec.value}
                  value={spec.value}
                  className="text-black"
                >
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
              Click on a doctor to continue...
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
