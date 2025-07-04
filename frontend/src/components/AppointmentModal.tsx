import { useState } from "react";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppointmentForm } from "./form/AppointmentForm";
import { getAppointmentSchema } from "@/lib/validation";

export const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
  title,
  description,
}: {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment?: typeof getAppointmentSchema;
  title?: string;
  description?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`cursor-pointer ${
            type === "schedule"
              ? "schedule-appointment-btn"
              : "cancel-appointment-btn"
          } hover:shadow-sm transition-all`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border-none shadow-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
