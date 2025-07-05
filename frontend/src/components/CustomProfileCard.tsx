import { Pencil, User, X, type LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import CustomFormField from "./CustomFormField";
import { useForm } from "react-hook-form";
import { FormFieldType } from "@/lib/validation";
import { useState } from "react";
import { Form } from "./ui/form";

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
      <div className="edit-field-wrapper flex items-center gap-2">
        <CustomFormField
          control={form.control}
          name="editableValue"
          fieldType={field.fieldType ?? FormFieldType.INPUT}
          inputType={field.inputType ?? "text"}
          placeholder={`Enter ${field.label}`}
          icon={field.icon}
        />
        <Button type="submit" size="sm" className="text-green-600 cursor-pointer">
          Update
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => toggleEdit(index)}
        >
          <X className="text-red-500" />
        </Button>
      </div>
      </form>
    </Form>
  );
};


const CustomProfileCard = ({
  title,
  icon: TitleIcon = User,
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
    <section className="personal">
      <h3 className="heading-tertiary flex items-center gap-2 text-blue-600">
        <TitleIcon className="text-xl" /> {title}
      </h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {fields.map((field, index) => {
          const FieldIcon = field.icon ?? User;
          const color = field.colorClass ?? "text-pink-500";
          return (
            <div
              key={index}
              className="profile-info-row flex items-center gap-2"
            >
              {editStates[index] ? (
                <EditField
                  field={field}
                  index={index}
                  toggleEdit={toggleEdit}
                />
              ) : (
                <>
                  <FieldIcon className={`${color} size-5`} />
                  <span>
                    <strong>{field.label}</strong> {field.value || "—"}
                  </span>
                  {field.onSave && (
                    field.inputType !== 'email' && field.inputType !== 'tel' && <Button
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
