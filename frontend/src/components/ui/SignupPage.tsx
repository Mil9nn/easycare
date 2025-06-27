"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema } from "@/lib/types";
import CustomFormField from "./CustomFormField";

import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`relative signup-page`}
      >
        <CustomFormField type="text" name="name" label="Full name" placeholder="John Doe" />
        <CustomFormField type="email" name="email" label="Email" placeholder="johndoe@example.com" />
        <CustomFormField type="password" name="password" label="Password" placeholder="Create a strong password" />
        <CustomFormField type="password" name="confirmPassword" label="Confirm Password" placeholder="Re-enter your password" />
        <X
          onClick={() => {
            navigate("/");
          }}
          className="close-dialog"
        />
        <Button className="submit-btn" type="submit">
          Submit
        </Button>
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
