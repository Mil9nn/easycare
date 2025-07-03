import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  isLoading: boolean;
  label: string | undefined;
  className?: string;
};

const SubmitButton = ({ isLoading, label }: SubmitButtonProps) => {
  return (
    <div className="flex items-center justify-center">
      <Button disabled={isLoading} type="submit" className="submit-btn">
        {isLoading ? <Loader2 className="animate-spin" /> : <span>{label}</span>}
      </Button>
    </div>
  );
};

export default SubmitButton;
