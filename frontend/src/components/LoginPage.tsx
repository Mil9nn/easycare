import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";

import { KeyRound, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/hooks/useAuthStore";
import SubmitButton from "./SubmitButton";
import { FormFieldType, LoginFormValidation } from "@/lib/validation";

export function LoginPage() {
  const navigate = useNavigate();

  const { login, isAuthenticating } = useAuthStore();

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  function onSubmit(values: z.infer<typeof LoginFormValidation>) {
    login(values, navigate);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`relative signup-page`}
      >
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
          control={form.control}
          icon={User}
        />
        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="password" label="Password" placeholder="Enter your password" icon={KeyRound} />
        <X
          onClick={() => {
            navigate("/");
          }}
          className="close-dialog"
        />
        <SubmitButton label={"Login"} isLoading={isAuthenticating} className="submit-btn" />
        {/* Forgot Password */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Button
              variant="link"
              onClick={() => {
                navigate("/signup");
              }}
              className="auth-link"
            >
              Signup
            </Button>
          </p>
          <Button
            variant="link"
            onClick={() => {
              navigate("/login");
            }}
            className="auth-link"
          >
            Forgot Password?
          </Button>
        </div>
      </form>
    </Form>
  );
}
