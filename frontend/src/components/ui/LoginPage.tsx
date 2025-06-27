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

export function LoginPage() {
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
        <CustomFormField
          type="email"
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
        />
        <CustomFormField type="password" name="password" label="Password" placeholder="Enter your password" />
        <X
          onClick={() => {
            navigate("/");
          }}
          className="close-dialog"
        />
        <Button className="submit-btn" type="submit">
          Submit
        </Button>
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
