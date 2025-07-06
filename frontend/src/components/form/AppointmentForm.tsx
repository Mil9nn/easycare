import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import { SelectItem } from "@/components/ui/select";
import SubmitButton from "@/components/SubmitButton";
import { Doctors } from "./constants";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormFieldType, getAppointmentSchema } from "@/lib/validation";
import { useNavigate } from "react-router-dom";
import { useAppointmentStore } from "../../hooks/useAppointmentStore";
import type { Appointment } from "@/types/types";

export function AppointmentForm({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { createAppointment, updateAppointment } = useAppointmentStore();

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  let status;

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    switch (type) {
      case "create":
        status = "pending";
        break;
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          note: values.note,
          status: status as Status,
          reason: values.reason!,
        };

        const appointment = await createAppointment(appointmentData, navigate);

        if (appointment) {
          form.reset();
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?._id as string,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment && setOpen) {
          setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error("Error submitting appointment form:", error);
    } finally {
      setIsLoading(false);
    }
  }

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      status = "pending";
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {type === "create" && (
          <section>
            <h2 className="text-2xl font-bold">Hey there👋</h2>
            <p className="text-sm opacity-55 font-extralight">
              Request a new appointment in 10 seconds
            </p>
          </section>
        )}
        {type !== "cancel" && (
          <>
            <section className="space-y-5">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Doctor"
                placeholder="Select a doctor"
              >
                {Doctors.map((doctor, index) => (
                  <SelectItem key={index} value={doctor.name}>
                    <div className="flex items-center gap-2">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        width={26}
                        height={26}
                        className="rounded-full"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Reason for appointment"
                  placeholder="ex: Annual monthly checkup"
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Additional notes (if any)"
                  placeholder="ex: I have a persistent cough"
                />
              </div>
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected appointment date"
                showTimeSelect
                dateFormat="MM/dd/yyyy - hh:mm aa"
              />
            </section>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel"
              ? "bg-red-400 text-white hover:bg-red-500 cursor-pointer"
              : "bg-teal-400 hover:bg-teal-500 cursor-pointer"
          } w-full`}
          label={buttonLabel}
        />
      </form>
    </Form>
  );
}
