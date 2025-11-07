import { Dialog } from "@/components/custom/Dialog";
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
  const navigate = useNavigate();

  useEffect(() => {
    getDoctorById(doctorId!);
  }, [getDoctorById, doctorId]);

  const handleUpdate = () => navigate(`/admin/edit-doctor/${doctor?._id}`);
  const handleDelete = async () => doctorId && (await deleteDoctor(doctorId));
  const handleToggle = async () => {
    await updateDoctorStatus(doctor!);
    await getDoctorById(doctorId!);
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader className="animate-spin size-6 text-blue-500" />
        <p className="text-sm text-gray-500 mt-2">
          Loading doctor details...
        </p>
      </div>
    );
  }

  if (!doctor) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8 transition">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={
                Array.isArray(doctor.profileImage)
                  ? URL.createObjectURL(doctor.profileImage[0])
                  : doctor.profileImage
              }
              alt={doctor.fullName}
              className="w-40 h-40 object-cover rounded-xl border border-gray-200"
            />
          </div>

          {/* Doctor Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {doctor.fullName}
              </h2>
              <p className="text-sm text-gray-500">
                MBBS — {doctor.specialization}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">
                <strong>{doctor.experience}</strong> years experience
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  doctor.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doctor.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Available Days:</span>{" "}
                {doctor.availableDays.map((day, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1"
                  >
                    {day}
                  </span>
                ))}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Timings:</span>{" "}
                <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                  {doctor.availableFrom} – {doctor.availableTo}
                </span>
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>About:</strong> Specializes in{" "}
                <span className="capitalize">{doctor.specialization}</span> with{" "}
                {doctor.experience}+ years of clinical experience. Available for
                consultations on{" "}
                {doctor.availableDays.join(", ")}.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 font-medium">Status:</span>
                <ToggleSwitch isActive={doctor.isActive!} onToggle={handleToggle} />
              </div>

              <div className="flex gap-3">
                <Dialog
                  label="Edit"
                  title="Redirect to edit page"
                  description="You can update the doctor's information there."
                  icon={SquarePen}
                  mode="edit"
                  className="flex items-center gap-2 text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition"
                  onClick={handleUpdate}
                />
                <Dialog
                  label="Delete"
                  title="Are you sure?"
                  description="This will permanently remove the doctor's profile."
                  icon={Trash}
                  mode="delete"
                  className="flex items-center gap-2 text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition"
                  onClick={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDoctors;
