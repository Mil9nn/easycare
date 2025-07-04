import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";

import { Lock, LockOpen, Mail, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/hooks/useAuthStore";
import SubmitButton from "./SubmitButton";
import { FormFieldType, UserFormValidation } from "@/lib/validation";

export function SignupPage() {
  const navigate = useNavigate();

  const { signup, isAuthenticating } = useAuthStore();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof UserFormValidation>) {
    signup(values, navigate);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`relative signup-page`}
      >
        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="fullName" label="Full name" placeholder="John Doe" icon={User} />
        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="email" label="Email" placeholder="johndoe@example.com" icon={Mail} />
        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="password" label="Password" placeholder="Create a strong password" icon={LockOpen} />
        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="confirmPassword" label="Confirm Password" placeholder="Re-enter your password" icon={Lock} />
        <X
          onClick={() => {
            navigate("/");
          }}
          className="close-dialog"
        />
        <SubmitButton label={"Signup"} isLoading={isAuthenticating} className="submit-btn" />
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={() => {
                navigate("/login");
              }}
              className="auth-link"
            >
              Login
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
