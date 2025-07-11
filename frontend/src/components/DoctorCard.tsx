import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type DoctorCardProps = {
  name: string;
  specialization: string;
  imageSrc: File[] | undefined;
  className?: string;
  doctorId?: string;
};

const DoctorCard = ({
  name,
  specialization,
  imageSrc,
  className,
}: DoctorCardProps) => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const patient = useFormStore((state) => state.patient);

  const handleClick = () => {
    if (!user) {
      toast.error("Please login to continue");
      return navigate("/login");
    } else if (!patient) {
      toast.error("You need to register as a patient first");
    }
    navigate("/book-appointment", {
      state: {
        doctor: {
          name,
          specialization,
        },
      },
    });
  };

  return (
    <div
      className="w-full h-full min-w-[200px] overflow-hidden hover:translate-y-[-2px] shadow hover:shadow-lg transition-shadow rounded cursor-pointer text-gray-900"
      onClick={handleClick}
    >
      <div className={clsx(`h-56 w-full overflow-hidden`, `${className}`)}>
        <img
          className="w-full h-fit max-w-60 max-h-56 rounded-t object-fit overflow-hidden"
          src={
            Array.isArray(imageSrc)
              ? URL.createObjectURL(imageSrc[0])
              : imageSrc
          }
          alt={name}
        />
      </div>

      <div className="p-6 pb-4 duration-[0.3s] bg-white">
        <div className="flex flex-col ">
          <span className="text-md font-semibold">{name}</span>
          <span className="text-gray-600 text-xs">{specialization}</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;

{
  /* <p className="Card-info text-gray-500 mt-2">08 years of experience</p> */
}

{
  /* <div className="mt-4 flex flex-col">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">
              Available for days:
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-3">
              <span className="bg-[#009689] text-white p-0.5">Mon</span>
              <span className="bg-[#009689] text-white p-0.5">Tue</span>
              <span className="bg-[#009689] text-white p-0.5">Wed</span>
              <span className="bg-[#009689] text-white p-0.5">Thu</span>
              <span className="bg-[#009689] text-white p-0.5">Fri</span>
              <span className="bg-[#009689] text-white p-0.5">Sat</span>
              <span className="bg-[#009689] text-white p-0.5">Sun</span>
            </p>
          </div>
          <div className="space-y-1 mt-2">
            <p className="text-sm font-medium text-gray-900">
              Available for time:
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span>09:00 AM to 05:00 PM</span>
            </p>
          </div>
        </div> */
}

{
  /* <div className="mt-2 flex items-center justify-end">
          <span className="flex gap-3">
            <SquarePen className="size-5 text-emerald-500 cursor-pointer hover:scale-105 active:scale-95 transtion-transform ease-in-out" />
            <Trash className="size-5 text-red-500 cursor-pointer hover:scale-105 active:scale-95 transtion-transform ease-in-out" />
          </span>
        </div> */
}

{
  /* <div className="flex items-center space-x-4 mt-3">
                    <p className="text-sm font-semibold text-gray-500">
                      Active:
                    </p>
                    <ToggleSwitch
                      isActive={doctor.isActive}
                      onToggle={handleToggle}
                    />
                  </div> */
}
