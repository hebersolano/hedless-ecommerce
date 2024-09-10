"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

import FormRow from "../../../components/form/FormRow";
import { FormMode } from "./login-types";
import OAuthLoginButton from "./OAuthLoginButton";

const requiredField = { required: "This field is required" };

type LoginInputs = {
  username: string;
  email: string;
  password: string;
};

const defaultFormMode: FormMode = {
  mode: "login",
  formTitle: "Login",
  buttonTitle: "Login",
  username: true,
  email: false,
  password: true,
};

function LoginForm({ formMode = defaultFormMode }: { formMode: FormMode }) {
  const { mode, formTitle, buttonTitle, username, email, password } = formMode;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = function (data) {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {username && (
          <FormRow label="Username" error={errors["username"]} required>
            <input
              type="text"
              id="username"
              {...register("username", requiredField)}
              placeholder="john"
            />
          </FormRow>
        )}
        {email && (
          <FormRow label="Email" error={errors["email"]} required>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="john@email.com"
              className="rounded-md px-4 py-2 ring-2 ring-border"
            />
          </FormRow>
        )}
        {password && (
          <FormRow label="Password" error={errors["password"]} required>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="rounded-md px-4 py-2 ring-2 ring-border"
            />
          </FormRow>
        )}
        {mode === "login" && (
          <Link href="?f=reset" className="text-sm">
            Forgot password?{" "}
            <span className="text-primary underline">Reset</span>
          </Link>
        )}
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:cursor-not-allowed disabled:bg-primary/30"
        >
          {buttonTitle}
        </button>

        {mode === "register" && (
          <Link href="?f=login" className="text-sm">
            Have an account?{" "}
            <span className="tracking-wider text-primary underline">Login</span>
          </Link>
        )}
        {mode === "reset" && (
          <Link href="?f=login" className="text-sm">
            Go back to{" "}
            <span className="tracking-wider text-primary underline">Login</span>
          </Link>
        )}
        {mode === "login" && (
          <Link href="?f=register" className="text-sm">
            Don&apos;t have an account?{" "}
            <span className="tracking-wider text-primary underline">
              Register
            </span>
          </Link>
        )}

        {mode === "login" || mode === "register" ? <OAuthLoginButton /> : null}
      </form>
    </>
  );
}

export default LoginForm;
