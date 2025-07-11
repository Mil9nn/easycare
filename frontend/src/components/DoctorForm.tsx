import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "@/lib/validation";
import { Stethoscope } from "lucide-react";
import { availableDays, Specializations } from "./form/constants";
import { SelectItem } from "./ui/select";
import { Label } from "./ui/label";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import SubmitButton from "./SubmitButton";
import FileUploader from "./FileUploader";
import { useAdminStore } from "@/hooks/useAdminStore";

import { doctorSchema } from "@/lib/validation";
import { Checkbox } from "./ui/checkbox";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export function DoctorForm({ mode }: { mode: "add" | "edit" }) {
  const addDoctor = useAdminStore((state) => state.addDoctor);
  const isAddingDoctor = useAdminStore((state) => state.isAddingDoctor);

  const { doctorId } = useParams();

  const getDoctorById = useAdminStore((state) => state.getDoctorById);
  const updateDoctor = useAdminStore((state) => state.updateDoctor);
  const doctor = useAdminStore((state) => state.doctor);
  const isUpdatingDoctor = useAdminStore((state) => state.isUpdatingDoctor);

  const form = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      fullName: "",
      specialization: doctor?.specialization || "",
      experience: 0,
      availableDays: [],
      profileImage: [],
    },
  });

  useEffect(() => {
    if (mode === "edit" && doctorId) {
      getDoctorById(doctorId);
    }
  }, [mode, doctorId, getDoctorById]);

  // Setting form values when in edit mode
  useEffect(() => {
    if (mode === "edit" && doctor) {
      form.reset({
        fullName: doctor.fullName,
        specialization: doctor.specialization,
        experience: doctor.experience,
        availableDays: doctor.availableDays,
        availableFrom: dayjs(doctor.availableFrom, "HH:mm").format("hh:mm A"),
        availableTo: dayjs(doctor.availableTo, "HH:mm").format("hh:mm A"),
        profileImage: doctor.profileImage,
      });
    }
  }, [mode, doctor, form, doctorId]);

  function onSubmit(values: z.infer<typeof doctorSchema>) {
    if (mode === "edit") {
      updateDoctor(doctorId!, values);
    } else {
      const formData = new FormData();

      formData.append("fullName", values.fullName);
      formData.append("specialization", values.specialization);
      formData.append("experience", values.experience.toString());
      formData.append("availableDays", JSON.stringify(values.availableDays));
      formData.append("availableFrom", values.availableFrom);
      formData.append("availableTo", values.availableTo);

      if (values.profileImage && values.profileImage.length > 0) {
        formData.append("profileImage", values.profileImage[0]);
      }

      addDoctor(formData);
      form.reset();
    }
  }

  return (
    <div className="h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 grid-cols-1 p-6">
        {/* Form Container */}
        <div className="shadow-lg bg-white rounded-l-2xl p-8 lg:p-10 h-full">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-primary-text mb-2">
              {mode === "add" ? (
                <span>Doctor registration</span>
              ) : (
                <span>Update doctor details</span>
              )}
            </h1>
            <p className="text-gray-500">
              {mode === "add" ? (
                <span>Please fill in your professional details</span>
              ) : (
                <span>Please update doctor's professional details</span>
              )}
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (err) => {
                console.log("Errors:", err);
              })}
              className="space-y-6"
            >
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="fullName"
                label="Full name"
                placeholder="Dr. John Doe"
                icon={Stethoscope}
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="specialization"
                label="Specialization"
                placeholder="Select a specialization"
                icon={Stethoscope}
              >
                {Specializations.map((spec, index) => (
                  <SelectItem key={index} value={spec.value}>
                    <div className="flex items-center gap-3">
                      <spec.icon
                        className={`size-6 p-1 rounded-full ${spec.textColor} ${spec.bgColor}`}
                      />
                      <span className="text-gray-700">{spec.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                control={form.control}
                name="experience"
                label="Experience (in years)"
                placeholder="Enter years of experience: ex: 12"
                inputType="number"
                fieldType={FormFieldType.INPUT}
              />
              {form.formState.errors.experience && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.experience.message}
                </p>
              )}

              <Controller
                control={form.control}
                name="availableDays"
                render={({ field }) => (
                  <div className="space-y-3">
                    <Label className="text-gray-700 font-medium">
                      Available Days
                    </Label>
                    <div className="flex items-center gap-5 flex-wrap">
                      {availableDays.map((day) => {
                        const value = day.toLowerCase();
                        const isSelected = field.value?.includes(value);

                        return (
                          <div
                            key={value}
                            className="flex flex-col items-center gap-1"
                          >
                            <Checkbox
                              id={value}
                              checked={isSelected}
                              className="border border-gray-400 cursor-pointer"
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([
                                    ...(field.value || []),
                                    value,
                                  ]);
                                } else {
                                  field.onChange(
                                    (field.value || []).filter(
                                      (d) => d !== value
                                    )
                                  );
                                }
                              }}
                            />
                            <Label
                              htmlFor={value}
                              className="text-sm cursor-pointer text-gray-600"
                            >
                              {day}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                    {form.formState.errors.availableDays && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.availableDays.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div className="space-y-3">
                <Label className="text-gray-700 font-medium mb-5">
                  Available time
                </Label>
                <div className="">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Controller
                      control={form.control}
                      name="availableFrom"
                      render={({ field }) => (
                        <TimePicker
                          label="From"
                          value={dayjs(field.value || "09:00", "hh:mm A")}
                          onChange={(date) =>
                            field.onChange(dayjs(date).format("hh:mm A"))
                          }
                        />
                      )}
                    />

                    <span className="text-gray-400">—</span>
                    <Controller
                      control={form.control}
                      name="availableTo"
                      render={({ field }) => (
                        <TimePicker
                          label="To"
                          value={dayjs(field.value || "17:00", "hh:mm A")}
                          onChange={(date) =>
                            field.onChange(dayjs(date).format("hh:mm A"))
                          }
                        />
                      )}
                    />
                  </div>
                  {form.formState.errors.availableFrom && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.availableFrom.message}
                    </p>
                  )}
                </div>
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="profileImage"
                  label="Profile Image"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <FileUploader
                        files={field.value as File[]}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  )}
                ></CustomFormField>
              </div>

              {mode === "add" ? (
                <SubmitButton
                  className="submit-btn"
                  label="Submit Doctor"
                  isLoading={isAddingDoctor}
                />
              ) : (
                <SubmitButton
                  label="Update"
                  isLoading={isUpdatingDoctor}
                  className="submit-btn"
                />
              )}
            </form>
          </Form>
        </div>

        {/* Image Placeholder */}
        <div className="hidden md:flex items-center justify-center overflow-hidden rounded-r-2xl">
          <div className="text-center text-gray-400">
            <img
              src="/assets/doc-form-bg.png"
              alt="Doctor Form Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
