import { Dialog } from "@/components/Dialog";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { useAdminStore } from "@/hooks/useAdminStore";
import { Loader, SquarePen, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ManageDoctors = () => {
  const isLoading = useAdminStore((state) => state.isLoading);
  const getDoctorById = useAdminStore((state) => state.getDoctorById);
  const doctor = useAdminStore((state) => state.doctor);
  const deleteDoctor = useAdminStore((state) => state.deleteDoctor);
  const updateDoctorStatus = useAdminStore((state) => state.updateDoctorStatus);

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
    await deleteDoctor(doctorId!);
  };

  const handleToggle = async () => {
    await updateDoctorStatus(doctor!);
    await getDoctorById(doctorId!);
  };

  return (
    <div className="p-7 bg-white shadow-sm">
      {doctor && (
        <div className="flex flex-col sm:flex-row items-stretch gap-4">
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
          <div className="flex-1 space-y-2 py-3">
            <h3 className="text-xl font-semibold text-gray-800">
              {doctor.fullName}
            </h3>
            <div className="flex items-center gap-3">
              <p className="text-md capitalize text-gray-600 pb-1">
                MBBS - {doctor.specialization}
              </p>
              <p className="text-xs text-gray-600 font-medium bg-primary border border-gray-300 p-1 px-2 rounded-full w-fit">
                <span className="text-xs">{doctor.experience}</span> years
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
            <p className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Time:</span>
              <span className="text-xs text-white font-medium bg-indigo-400 rounded px-2">
                {doctor.availableFrom} – {doctor.availableTo}
              </span>{" "}
            </p>
            <p className="max-w-[700px]  text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod magna vel magna tincidunt, ac malesuada lorem eleifend.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod magna vel magna tincidunt, ac malesuada lorem eleifend.
            </p>
            <div className="flex items-center justify-between">
              <div>
              <span className="text-sm font-medium text-gray-700 mr-2">
                Status:
              </span>
              <ToggleSwitch
                isActive={doctor.isActive!}
                onToggle={handleToggle}
              />
            </div>
              <div className="flex gap-3">
                <Dialog
                  label={"Edit"}
                  title="You'll be redirected to the edit page."
                  description="Update the doctor's information there."
                  icon={SquarePen}
                  mode="edit"
                  className="text-emerald-500 bg-emerald-100 shadow-md flex items-center gap-1 p-2 px-3 rounded-full cursor-pointer hover:scale-105 active:scale-95 duration-400 transtion-transform ease-in-out"
                  onClick={handleUpdate}
                />
                <Dialog
                  label={"Delete"}
                  title="Are you absolutely sure?"
                  description="This will permanently delete the doctor and remove all associated data 
                from our servers."
                  icon={Trash}
                  mode="delete"
                  className="text-rose-500 bg-rose-100 shadow-md flex items-center gap-1 p-2 px-3 rounded-full cursor-pointer hover:scale-105 active:scale-95 duration-400 transtion-transform ease-in-out"
                  onClick={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
