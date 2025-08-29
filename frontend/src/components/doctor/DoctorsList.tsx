import { useAdminStore } from "@/hooks/useAdminStore";
import { useNavigate } from "react-router-dom";
import { Specializations } from "../form/constants";
import { useState } from "react";
import { Plus } from "lucide-react"; // sleek modern icon

const DoctorsList = () => {
  const doctors = useAdminStore((state) => state.doctors);
  const navigate = useNavigate();

  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = (doctor: CreateDoctorParams) => {
    navigate(`/admin/list/doctor/${doctor._id}`);
  };

  const handleAddDoctor = () => {
    navigate("/admin/add-doctor");
  };

  const filteredDoctors = doctors?.filter((doc) =>
    selectedSpecialization ? doc.specialization === selectedSpecialization : true
  );

  const searchedDoctors = filteredDoctors?.filter(
    (doc) =>
      doc.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          All Practitioners
        </h1>
        <p className="text-gray-600 mt-1 max-w-2xl">
          View and manage all registered doctors in the healthcare system. Track
          their profiles, specialties, and appointment statistics.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            value={selectedSpecialization}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All Specializations</option>
            {Specializations.map((spec) => (
              <option key={spec.value} value={spec.value}>
                {spec.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {searchedDoctors?.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => handleClick(doctor)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="w-full h-56 overflow-hidden rounded-t-2xl">
              <img
                src={
                  Array.isArray(doctor.profileImage)
                    ? URL.createObjectURL(doctor.profileImage[0])
                    : doctor.profileImage
                }
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                {doctor.fullName}
              </h3>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Doctor Button */}
      <button
        onClick={handleAddDoctor}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
      >
        <Plus size={20} />
        Add Doctor
      </button>
    </div>
  );
};

export default DoctorsList;
