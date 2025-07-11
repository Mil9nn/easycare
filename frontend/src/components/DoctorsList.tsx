import { useAdminStore } from "@/hooks/useAdminStore";
import { useNavigate } from "react-router-dom";

const DoctorsList = () => {
  const doctors = useAdminStore((state) => state.doctors);

  const navigate = useNavigate();

  const handleClick = (doctor: CreateDoctorParams) => {
    navigate(`/admin/list/doctor/${doctor._id}`);
  };

  return (
    <div className="space-y-6 px-5">
      <div className="space-y-2">
        <p className="text-sm text-gray-600 mt-1">
          View and manage all registered doctors in the healthcare system.
          Monitor their profiles, specialties, and appointment statistics.
        </p>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            All Practitioners
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <select className="border rounded px-3 py-1 text-sm">
              <option>Filter by Specialty</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Pediatrics</option>
            </select>
            <input
              type="text"
              placeholder="Search doctors..."
              className="border rounded px-3 py-1 text-sm w-64"
            />
          </div>
        </div>

        <div className="">
          {/* Add more Doctor components as needed */}
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5">
            {doctors?.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => {
                  handleClick(doctor);
                }}
                className="shadow hover:shadow-lg transition-shadow rounded cursor-pointer"
              >
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={
                      Array.isArray(doctor.profileImage)
                        ? URL.createObjectURL(doctor.profileImage[0])
                        : doctor.profileImage
                    }
                    className="w-full h-fit rounded-t max-w-60 max-h-56 object-fit"
                  />
                </div>
                <div key={doctor._id} className="bg-white p-4 rounded">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {doctor.fullName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {doctor.specialization}
                  </p>
                  {/* <p className="text-sm text-gray-500">Appointments: {doctor.appointmentsCount}</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
