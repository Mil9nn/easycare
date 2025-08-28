import { Pencil, type LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import CustomFormField from "./CustomFormField";
import { useForm } from "react-hook-form";
import { FormFieldType } from "@/lib/validation";
import { useState } from "react";
import { Form } from "../ui/form";

export type ProfileField = {
  name: string;
  label: string;
  value?: React.HTMLInputTypeAttribute;
  icon?: LucideIcon;
  colorClass?: string;
  fieldType?: FormFieldType;
  inputType?: React.HTMLInputTypeAttribute;
  onSave?: (val: string) => void;
};

type CustomProfileCardProps = {
  title: string;
  icon?: LucideIcon;
  fields: ProfileField[];
};

const EditField = ({
  field,
  index,
  toggleEdit,
}: {
  field: ProfileField;
  index: number;
  toggleEdit: (index: number) => void;
}) => {
  const form = useForm({
    defaultValues: { editableValue: field.value || "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          field.onSave?.(data.editableValue);
          toggleEdit(index);
        })}
      >
        <div className="edit-field-wrapper">
          <div className="flex-1">
            <CustomFormField
            control={form.control}
            name="editableValue"
            fieldType={field.fieldType ?? FormFieldType.INPUT}
            inputType={field.inputType ?? "text"}
            placeholder={`Enter ${field.label}`}
            icon={field.icon}
          />
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              size="sm"
              variant="outline"
              className="text-green-600 cursor-pointer border-black/30"
            >
              Update
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="text-btn-danger border-black/30"
              onClick={() => toggleEdit(index)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

const CustomProfileCard = ({
  title,
  fields,
}: CustomProfileCardProps) => {
  const [editStates, setEditStates] = useState<{ [key: number]: boolean }>({});

  const toggleEdit = (index: number) => {
    setEditStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const form = useForm({
    defaultValues: { editableValue: "" },
  });

  const startEditing = (index: number, initialValue: string) => {
    form.setValue("editableValue", initialValue);
    setEditStates((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section className="profile-card">
      <h3 className="text-xl font-extrabold">
         {title}
      </h3>
      <div className="mt-5 space-y-5">
        {fields.map((field, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              {editStates[index] ? (
                <div className="w-full">
                  <EditField
                  field={field}
                  index={index}
                  toggleEdit={toggleEdit}
                />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="space-y-2">
                      <p><strong>{field.label}</strong></p>
                      <p>{field.value || "—"}</p>
                    </div>
                  </div>
                  {field.onSave &&
                    field.inputType !== "email" &&
                    field.inputType !== "tel" && (
                      <Button
                        onClick={() => startEditing(index, field.value!)}
                        title={`Edit ${field.label}`}
                        className="cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                      >
                        <Pencil className="size-4 text-gray-500" />
                      </Button>
                    )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CustomProfileCard;
