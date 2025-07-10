import { useAdminStore } from "@/hooks/useAdminStore";
import { Loader, SquarePen, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ManageDoctors = () => {
  const isLoading = useAdminStore((state) => state.isLoading);
  const getDoctorById = useAdminStore((state) => state.getDoctorById);
  const doctor = useAdminStore((state) => state.doctor);
  const deleteDoctor = useAdminStore((state) => state.deleteDoctor);

  const { doctorId } = useParams();

  useEffect(() => {
    getDoctorById(doctorId!);
  }, [getDoctorById, doctorId]);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-[80vh] w-screen flex flex-col items-center justify-center">
        <Loader className="animate-spin size-8 text-teal-500" />
        <p className="text-sm text-gray-500 max-w-xs mt-2">
          Loading doctor details...
        </p>
      </div>
    );
  }

  const handleUpdate = async () => {
    navigate(`/admin/edit-doctor/${doctor?._id}`);
  };

  const handleDelete = async () => {
    if (!doctorId) {
      console.error("Doctor ID is not defined");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this doctor?")) {
      return;
    }
    await deleteDoctor(doctorId!);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      {doctor && (
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="bg-indigo-500 rounded w-full max-w-70">
            <img
              src={
                Array.isArray(doctor.profileImage)
                  ? URL.createObjectURL(doctor.profileImage[0])
                  : doctor.profileImage
              }
              alt={doctor.fullName}
              className="w-28 h-28 max-w-[280px] max-h-[280px] sm:w-full sm:h-fit object-contain"
            />
          </div>
          <div className="relative space-y-2 py-3">
            <h3 className="text-xl font-semibold text-gray-800">
              {doctor.fullName}
            </h3>
            <div className="flex items-center gap-3">
              <p className="text-md capitalize text-gray-600 pb-1">
                MBBS - {doctor.specialization}
              </p>
              <p className="text-xs text-gray-600 bg-primary border border-gray-300 px-2 rounded-full w-fit">
                {doctor.experience} years
              </p>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Available:</span>{" "}
              {doctor.availableDays.map((day, index) => (
                <span
                  key={index}
                  className="bg-[#009689] capitalize text-xs font-medium mr-2 rounded px-2 text-white p-0.5"
                >
                  {day}
                </span>
              ))}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Time:</span>{" "}
              {doctor.availableFrom} – {doctor.availableTo}
            </p>
            <p className="max-w-[700px]  text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod magna vel magna tincidunt, ac malesuada lorem eleifend.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod magna vel magna tincidunt, ac malesuada lorem eleifend.
            </p>
            <div className="absolute right-1 -bottom-4 flex items-center">
              <span className="flex gap-3">
                <SquarePen
                  onClick={handleUpdate}
                  className="size-10 text-emerald-500 bg-gray-200 p-2 rounded-full cursor-pointer hover:scale-110 active:scale-90 duration-400 transtion-transform ease-in-out"
                />
                <Trash
                  onClick={handleDelete}
                  className="size-10 text-red-500 bg-gray-200 p-2 rounded-full cursor-pointer hover:scale-110 active:scale-90 duration-400 transtion-transform ease-in-out"
                />
              </span>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
