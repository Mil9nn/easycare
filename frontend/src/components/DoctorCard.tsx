import clsx from "clsx";
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

      <div className="p-6 pb-6 duration-[0.3s] bg-white">
        <div className="flex flex-col ">
          <span className="text-md font-semibold">{name}</span>
          <span className="text-gray-600 text-xs">{specialization}</span>
        </div>
      </div>
      {isActive ? (
        <span className="absolute bottom-0 left-0 inline-flex items-center gap-1 w-fit bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Available
        </span>
      ) : (
        <span className="absolute bottom-0 left-0 inline-flex items-center gap-1 w-fit bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Not Available
        </span>
      )}
    </div>
  );
};

export default DoctorCard;
