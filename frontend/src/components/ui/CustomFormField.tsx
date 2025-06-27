import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema, type customProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CustomFormField = ({ name, label, placeholder, type }: customProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="w-4 h-4 absolute top-3 left-2" />
                <Input
                  type={type}
                  className="shadcn-input"
                  placeholder={placeholder}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage className="text-red-500 text-sm" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;
