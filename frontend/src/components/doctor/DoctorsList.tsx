import { useAdminStore } from "@/hooks/useAdminStore";
import { useNavigate } from "react-router-dom";
import { Specializations } from "../form/constants";
import { useState } from "react";
import { Plus, Search } from "lucide-react";

const DoctorsList = () => {
  const doctors = useAdminStore((state) => state.doctors);
  const navigate = useNavigate();

  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRowClick = (doctor: CreateDoctorParams) => {
    navigate(`/admin/list/doctor/${doctor._id}`);
  };

  const handleAddDoctor = () => {
    navigate("/admin/add-doctor");
  };

  const filteredDoctors = doctors?.filter((doc) =>
    selectedSpecialization
      ? doc.specialization === selectedSpecialization
      : true
  );

  const searchedDoctors = filteredDoctors?.filter(
    (doc) =>
      doc.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          All Practitioners
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          View and manage all registered doctors in the system.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            value={selectedSpecialization}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All Specializations</option>
            {Specializations.map((spec) => (
              <option key={spec.value} value={spec.value}>
                {spec.name}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="py-3 px-5 font-medium">Doctor</th>
              <th className="py-3 px-5 font-medium">Specialization</th>
              <th className="py-3 px-5 font-medium">Experience</th>
              <th className="py-3 px-5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {searchedDoctors?.length ? (
              searchedDoctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  onClick={() => handleRowClick(doctor)}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="py-3 px-5 flex items-center gap-3">
                    <img
                      src={
                        Array.isArray(doctor.profileImage)
                          ? URL.createObjectURL(doctor.profileImage[0])
                          : doctor.profileImage
                      }
                      alt={doctor.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {doctor.fullName}
                      </p>
                      <p className="text-xs text-gray-500">ID: {doctor._id?.slice(-6)}</p>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-gray-600 capitalize">
                    {doctor.specialization}
                  </td>
                  <td className="py-3 px-5 text-gray-600">
                    {doctor.experience ? `${doctor.experience}+ yrs` : "—"}
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doctor.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {doctor.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-gray-500 italic"
                >
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Add Doctor Button */}
      <button
        onClick={handleAddDoctor}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-md flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
      >
        <Plus size={18} />
        Add Doctor
      </button>
    </div>
  );
};

export default DoctorsList;

