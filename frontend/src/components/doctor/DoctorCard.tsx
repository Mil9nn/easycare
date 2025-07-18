import clsx from "clsx";
import { Dot } from "lucide-react";
import { useNavigate } from "react-router-dom";

type DoctorCardProps = {
  name: string;
  specialization: string;
  imageSrc: File[] | undefined;
  className?: string;
  doctorId?: string;
  isActive?: boolean;
};

const DoctorCard = ({
  name,
  specialization,
  imageSrc,
  className,
  doctorId,
  isActive,
}: DoctorCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (doctorId) {
      navigate(`/doctor/${doctorId}`);
    }
  };

  return (
    <div
      className="relative w-full h-full min-w-[200px] overflow-hidden hover:translate-y-[-2px] shadow hover:shadow-lg transition-shadow rounded cursor-pointer text-gray-900"
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

      <div className="p-6 pb-7 duration-[0.3s] bg-white">
        <div className="flex flex-col ">
          <span className="text-md font-semibold">{name}</span>
          <span className="text-gray-600 capitalize text-xs">{specialization}</span>
        </div>
      </div>
      {isActive && 
        <span className="absolute bottom-0 left-0 inline-flex items-center w-fit bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
          <Dot className="size-5 text-green-500" />
          Available
        </span>}
       
        {!isActive && <span className="absolute bottom-0 left-0 inline-flex items-center gap-1 w-fit bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
          <Dot className="size-5 text-gray-500" />
          Not Available
        </span>}
    </div>
  );
};

export default DoctorCard;
