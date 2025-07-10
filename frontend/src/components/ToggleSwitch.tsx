type ToggleSwitchProps = {
  isActive: boolean;
  onToggle: () => void;
};

export const ToggleSwitch = ({ isActive, onToggle }: ToggleSwitchProps) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 cursor-pointer ${
        isActive ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
          isActive ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
};
