import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  isLoading: boolean;
  label: string;
};

const SubmitButton = ({ isLoading, label }: SubmitButtonProps) => {
  return (
    <div className="flex items-center justify-center">
      <Button disabled={isLoading} className="submit-btn" type="submit">
        {isLoading ? <Loader2 className="animate-spin" /> : <span>{label}</span>}
      </Button>
    </div>
  );
};

export default SubmitButton;
