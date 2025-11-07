import { useAdminStore } from "@/hooks/useAdminStore";
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
    const value = e.target.value;
    navigate(value === "all" ? "/doctors" : `/doctors?specialization=${value}`);
  };

  return (
    <section className="px-6 md:px-10 py-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Our Doctors
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Browse our verified specialists and choose the right expert for your needs.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 p-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="search"
            placeholder="Search by name or specialty..."
            className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800 placeholder-gray-400 transition"
          />
        </div>

        {/* Specialization Filter */}
        <select
          id="specialization"
          onChange={handleChange}
          value={specialization || "all"}
          className="w-full sm:w-44 py-2.5 px-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
        >
          {Specializations.map((spec) => (
            <option key={spec.value} value={spec.value}>
              {spec.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subheader */}
      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-gray-800">
          {specialization
            ? `Doctors specialized in ${specialization}`
            : "All available doctors"}
        </p>
        <p className="text-sm text-gray-500">
          Click on a doctor to view details or book a consultation.
        </p>
      </div>

      {/* Doctor List */}
      {gettingDoctors ? (
        <div className="flex items-center justify-center gap-2 mt-10 text-blue-500">
          <Loader className="animate-spin h-5 w-5" />
          <p>Loading doctors...</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-sm">
          {filteredDoctors?.map((doctor) => (
            <button
              key={doctor._id}
              onClick={() => navigate(`/doctor/${doctor._id}`)}
              className="w-full text-left px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition"
            >
              <img
                src={doctor.profileImage as unknown as string}
                alt={doctor.fullName}
                className="w-14 h-14 rounded-full object-cover border border-gray-200"
              />
              <div className="flex-1 text-start">
                <h3 className="font-semibold text-gray-900">
                  {doctor.fullName}
                </h3>
                <p className="text-gray-600 text-sm">
                  {doctor.specialization}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    doctor.isActive ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {doctor.isActive ? "Available" : "Offline"}
                </p>
              </div>
              <span className="text-blue-500 text-sm font-medium hover:underline">
                View
              </span>
            </button>
          ))}

          {filteredDoctors?.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No doctors found for this specialization.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default AllDoctors;

