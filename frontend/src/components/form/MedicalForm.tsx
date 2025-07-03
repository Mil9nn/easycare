import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";

import { PatientFormValidation } from "@/lib/validation";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/lib/validation";
import { SelectItem } from "../ui/select";
import SubmitButton from "../SubmitButton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "./constants";
import FileUploader from "../FileUploader";
import { Calendar, Mail, User } from "lucide-react";
import { useFormStore } from "@/hooks/useFormStore";
import { useNavigate } from "react-router-dom";

type PatientFormValues = z.infer<typeof PatientFormValidation>;

export function MedicalForm({ user }: { user: User }) {
  const navigate = useNavigate();

  const { createPatient, isLoadingPatient  } = useFormStore();

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
    },
  });

  async function onSubmit(values: PatientFormValues) {
    const formData = new FormData();

    // Append all other fields from values
    Object.entries(values).forEach(([key, value]) => {
      // Skip the file field for now
      if (key === "identificationDocument") return;

      // Handle booleans properly
      if (typeof value === "boolean") {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value as string);
      }
    });

    // Append file if available
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const file = values.identificationDocument[0];
      formData.append("identificationDocument", file, file.name);
    }

    createPatient(formData, navigate);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="medical-form"
      >
        <section>
          <h2 className="heading-secondary">Welcome👋</h2>
          <p className="text-sm opacity-55 font-extralight">
            Let us know more about yourself
          </p>
        </section>
        <section className="space-y-5 mb-12">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="fullName"
            label="Full name"
            placeholder="John Doe"
            icon={User}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              icon={Mail}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="phone"
              label="Phone number"
              placeholder="+1234567890"
            />
          </div>

          {/* BirthDate & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
              icon={Calendar}
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={() => (
                <FormControl>
                  <RadioGroup className="flex items-center">
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem
                          className="radio-item data-[state=checked]:bg-blue-500"
                          value={option}
                          id={option}
                        />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="ex: 14 street, New york, NY-5101"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="ex: +1234567890"
            />
          </div>
        </section>

        {/* Medical History Form Section */}
        <section className="space-y-5">
          <h2 className="heading-secondary">Medical Information</h2>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary physician"
            placeholder="Select a physician"
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
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="ex: ABC Health"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ex: ABC4567890"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies"
              placeholder="ex: Penicillin, Nuts"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="ex: Aspirin, Metformin, Levothyroxine 50mcg"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family medical history (if relevant)"
              placeholder="ex: Mother had breast cancer"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="ex: Asthma diagnosis in childhood"
            />
          </div>
        </section>
        <section className="space-y-5">
          <h2 className="heading-secondary">
            Identification and Verification
          </h2>
          <div className="space-y-5">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              label="Identification type"
            >
              {IdentificationTypes.map((type, index) => (
                <SelectItem key={index} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              label="Identification number"
              placeholder="ex: 1234567890"
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="identificationDocument"
              label="Scanned copy of identification document"
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
        </section>
        <section className="space-y-5">
          <h2 className="heading-secondary">Consent and Privacy</h2>
          <div className="space-y-2">
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="treatmentConsent"
              label="I consent to receive treatment for my health condition."
              placeholder="ex: 1234567890"
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="disclosureConsent"
              label="I consent to the use and disclosure of my health information for treatment purposes."
              placeholder="ex: 1234567890"
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="privacyConsent"
              label="I acknowledge that I have read and understood the privacy policy."
              placeholder="ex: 1234567890"
            />
          </div>
        </section>
        <SubmitButton label="Save medical profile" isLoading={isLoadingPatient} />
      </form>
    </Form>
  );
}
