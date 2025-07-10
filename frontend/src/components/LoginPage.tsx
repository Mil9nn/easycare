import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";

import { KeyRound, Mail } from "lucide-react";
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
      email: "",
      password: "",
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
        <div>
          <h1 className="text-2xl font-bold mb-1">Login</h1>
        <p className="text-sm text-gray-500">Please login to book appointment</p>
        </div>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
          control={form.control}
          icon={Mail}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          inputType="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          icon={KeyRound}
        />
        
        <SubmitButton
          label={"Login"}
          isLoading={isAuthenticating}
          className="submit-btn"
        />
        
        <div className="flex flex-col items-start">
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
        </div>
      </form>
    </Form>
  );
}
