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
      className="relative cursor-pointer group rounded-2xl overflow-hidden 
                bg-white/5 backdrop-blur-md border border-white/10 
                shadow-sm shadow-black/30 hover:scale-[1.02] transition transform duration-700"
      onClick={handleClick}
    >
      <div className={`h-56 w-full`}>
        <img
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-700"
          src={
            Array.isArray(imageSrc)
              ? URL.createObjectURL(imageSrc[0])
              : imageSrc
          }
          alt={name}
        />
      </div>

      <div className="bg-white">
        <div className="p-4 space-y-1">
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="capitalize text-sm text-gray-400">{specialization}</p>
          <p className="text-xs text-gray-500">12+ years</p>
        </div>
      </div>
      {isActive && (
        <span className="absolute bottom-0 right-0 flex items-center gap-1 w-fit bg-green-100 text-xs font-medium p-1">
          <span className="w-3 h-3 bg-green-500 border-2 border-white shadow-md rounded-full" />
          <span>Available</span>
        </span>
      )}
    </div>
  );
};

export default DoctorCard;
