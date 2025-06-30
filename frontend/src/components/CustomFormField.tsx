import { z } from "zod";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, ControllerRenderProps, FieldValues } from 'react-hook-form'
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';

import { FormFieldType, PatientFormValidation } from "@/lib/validation";

import type { Path } from "react-hook-form";
import { FileText, type LucideIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";

type PatientFormValues = z.infer<typeof PatientFormValidation>;

interface CustomProps<T extends FieldValues = PatientFormValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
  fieldType?: FormFieldType;
}

const RenderInput = <T extends FieldValues>({
  field,
  props,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  props: CustomProps<T>;
}) => {
  const { fieldType, icon: Icon=FileText, placeholder } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="relative flex rounded-md">
          <Icon className="input-field-icon" />
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shadcn-input"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shadcn-textarea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="shad-checkbox-container">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="shad-checkbox"
              disabled={props.disabled}
            />
            <label htmlFor={props.name} className="shad-checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center">
          <Icon className="input-field-icon" />
          <Input
            type="datetime-local"
            value={field.value}
            onChange={(date) => field.onChange(date)}
            className="shadcn-input"
          />
        </div>
      );
    // case FormFieldType.PHONE_INPUT:
    //   return (
    //     <FormControl>
    //       <PhoneInput
    //         defaultCountry="US"
    //         placeholder={placeholder}
    //         international
    //         withCountryCallingCode
    //         value={field.value as E164Number | undefined}
    //         onChange={field.onChange}
    //       />
    //     </FormControl>
    //   );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <div className="bg-dark-400 px-2 py-1 rounded-md">
                  <SelectValue placeholder={props.placeholder} />
                </div>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
  const { control, name, label, fieldType } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && (
            <FormLabel>{label}</FormLabel>
          )}
          <FormControl>
            {/* RenderInput component comes here */}
            <RenderInput field={field} props={props} />
          </FormControl>
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;