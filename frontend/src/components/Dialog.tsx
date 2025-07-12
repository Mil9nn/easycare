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
};

export const Dialog = ({ label, title, description, icon: Icon=Droplets, className, onClick }: DialogProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className={className}>
            <Icon className="size-5" />
            {label}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-indigo-100">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {/* Are you absolutely sure? */ title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {/* This action cannot be undone. This will permanently delete your
            account and remove your data from our servers. */}
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClick} className="cursor-pointer">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
