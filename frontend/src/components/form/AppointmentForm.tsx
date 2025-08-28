import { Form } from "@/components/ui/form";
import CustomFormField from "../custom/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormFieldType, getAppointmentSchema } from "@/lib/validation";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppointmentStore } from "../../hooks/useAppointmentStore";
import type { Appointment, Status } from "@/types/types";

// --- helper: merge date + time into one ISO string ---
function mergeDateTime(date?: string, time?: string): string | null {
  if (!date || !time) return null;
  const baseDate = new Date(date);
  const timeDate = new Date(time);
  baseDate.setHours(timeDate.getHours(), timeDate.getMinutes());
  return baseDate.toISOString();
}

/**
 * Convert strings like "28/08/2025, 06:00:00" -> "28/08/2025, 6:00 am"
 * Works when time has seconds or not. If the input doesn't match,
 * it returns the original string.
 */
function convertMergedToAmPm(
  merged: string,
  opts: { upperCaseSuffix?: boolean } = {}
): string {
  if (!merged || typeof merged !== "string") return "";

  const { upperCaseSuffix = true } = opts;

  // Split on the first comma (common format: "date, time")
  const commaIndex = merged.indexOf(",");
  let datePart: string;
  let timePart: string;

  if (commaIndex !== -1) {
    datePart = merged.slice(0, commaIndex).trim();
    timePart = merged.slice(commaIndex + 1).trim();
  } else {
    // No comma — try to find the time inside the string
    const timeMatch = merged.match(/([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?/);
    if (!timeMatch) return merged;
    const timeStart = timeMatch.index || 0;
    datePart = merged.slice(0, timeStart).replace(/,?\s*$/, "").trim();
    timePart = timeMatch[0];
  }

  // Extract the HH:mm (ignore seconds if present)
  const timeMatch = timePart.match(/([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?/);
  if (!timeMatch) return merged;

  const hh = parseInt(timeMatch[1], 10);
  const mm = timeMatch[2].padStart(2, "0");
  const suffix = hh >= 12 ? (upperCaseSuffix ? "PM" : "pm") : (upperCaseSuffix ? "AM" : "am");
  const hh12 = hh % 12 || 12;
  const converted = `${hh12}:${mm} ${suffix}`;

  // If datePart is empty, just return the time
  return datePart ? `${datePart}, ${converted}` : converted;
}


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
  const location = useLocation();

  const preSelectedDoctor = location.state?.doctor?.name || "";
  const preSelectedDate = location.state?.schedule?.date;
  const preSelectedTime = location.state?.schedule?.time;

  const [isLoading, setIsLoading] = useState(false);

  const { createAppointment, updateAppointment } = useAppointmentStore();

  const AppointmentFormValidation = getAppointmentSchema(type);

  const defaultSchedule =
    appointment?.schedule
      ? new Date(appointment.schedule).toISOString().slice(0, 16)
      : mergeDateTime(preSelectedDate, preSelectedTime) ||
        new Date().toISOString().slice(0, 16);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: preSelectedDoctor || appointment?.primaryPhysician,
      schedule: defaultSchedule,
      reason: appointment?.reason || "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const statusMap: Record<typeof type, Status> = {
    create: "pending",
    schedule: "scheduled",
    cancel: "cancelled",
  };

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          note: values.note,
          status: statusMap[type],
          reason: values.reason!,
        };

        const created = await createAppointment(appointmentData, navigate);
        if (created) form.reset();
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?._id as string,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: statusMap[type],
            cancellationReason: values.cancellationReason,
          },
          type,
        };

        const updated = await updateAppointment(appointmentToUpdate);
        if (updated && setOpen) {
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

  const buttonLabel =
    type === "cancel"
      ? "Cancel Appointment"
      : type === "create"
      ? "Confirm"
      : "Schedule Appointment";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {type !== "cancel" && (
          <section className="space-y-3">
            {/* Preview Selected Doctor */}
            <div className="text-sm text-gray-600">
              <p>
                Your selected doctor is:{" "}
                <span className="font-medium text-gray-900">{preSelectedDoctor}</span>
              </p>
            </div>

            {/* Preview Selected Date */}
            <div className="text-sm text-gray-600">
              <p>
                Your selected appointment date and time is:{" "}
                <span className="font-medium text-gray-900">
                  {form.getValues("schedule")
                    ? convertMergedToAmPm(new Date(form.getValues("schedule")).toLocaleString())
                    : "Not selected"}
                </span>
              </p>
            </div>
            
              
                

            {/* Reason + Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </section>
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
              ? "bg-red-400 text-white hover:bg-red-500"
              : "bg-teal-400 hover:bg-teal-500"
          } w-full`}
          label={buttonLabel}
        />
      </form>
    </Form>
  );
}
