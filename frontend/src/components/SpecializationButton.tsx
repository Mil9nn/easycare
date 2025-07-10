type Props = {
  iconSrc: string;
  specialization: string;
  onClick?: () => void;
};

const SpecializationButton = ({ iconSrc, specialization, onClick }: Props) => {
  return (
    <button onClick={onClick} className="flex flex-col justify-center items-center gap-1 hover:translate-y-[-10px] transition-transform ease-in-out duration-500 cursor-pointer">
      <img
        src={iconSrc}
        alt={`${specialization} Icon`}
        className="w-17 h-17 object-fit"
      />
      <span className="text-xs font-semibold text-gray-700">
        {specialization}
      </span>
    </button>
  );
};

export default SpecializationButton;
