import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Droplets, type LucideIcon } from "lucide-react";

type DialogProps = {
  label?: string;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
  mode?: "edit" | "delete";
};

export const Dialog = ({
  label,
  title,
  description,
  icon: Icon = Droplets,
  mode,
  className,
  onClick,
}: DialogProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className={className}>
            <Icon className="size-5" />
            {label}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white border-none">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={onClick}
              className={`px-4 py-2 ${mode === "edit" ? "bg-indigo-600" : "bg-rose-500"} text-white hover:bg-indigo-700 rounded-md transition-colors duration-200`}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
