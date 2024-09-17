"use client";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { FormMode, LoginInputs } from "./login-types";
import { useRouter } from "next/navigation";
import { LoginState, StateMachine } from "@wix/sdk";
import { zodResolver } from "@hookform/resolvers/zod";

import FormRow from "../../../components/form/FormRow";
import OAuthLoginButton from "./OAuthLoginButton";
import useWixClient from "@/hooks/useWixClient";
import { setSessionTokens } from "@/lib/helpers/setSessionTokens";
import { LoginFormSchemas } from "@/lib/schemas";
import { handleSubmitData, handleSubmitResponse } from "./helpers";

const defaultFormMode: FormMode = {
  mode: "login",
  formTitle: "Login",
  buttonTitle: "Login",
  username: true,
  email: false,
  password: true,
};

function LoginForm({
  formMode = defaultFormMode,
  stateToken,
}: {
  formMode: FormMode;
  stateToken: string;
}) {
  const { mode, formTitle, buttonTitle, username, email, password } = formMode;
  const wixClient = useWixClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<LoginInputs>({ resolver: zodResolver(LoginFormSchemas[mode]) });

  const onSubmit: SubmitHandler<LoginInputs> = async function (formData) {
    console.log(formData);

    const response = await handleSubmitData({
      mode,
      wixClient,
      formData,
      stateToken,
    });

    handleSubmitResponse({ response, wixClient, router, setError });
  };

  const onError: SubmitErrorHandler<LoginInputs> = (e) => {
    console.log(e);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-6"
      >
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {username && (
          <FormRow label="Username" error={errors["username"]} required>
            <input
              type="text"
              id="username"
              {...register("username")}
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
          <>
            <FormRow label="Password" error={errors["password"]} required>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="rounded-md px-4 py-2 ring-2 ring-border"
              />
            </FormRow>
            {mode === "register" && (
              <FormRow
                label="Insert Password"
                error={errors["validatePassword"]}
                required
              >
                <input
                  type="password"
                  id="validatePassword"
                  {...register("validatePassword")}
                  placeholder=""
                  className="rounded-md px-4 py-2 ring-2 ring-border"
                />
              </FormRow>
            )}
          </>
        )}
        {mode === "verification" && (
          <FormRow label="Code" error={errors["code"]} required>
            <input
              type="text"
              id="code"
              placeholder=""
              {...register("code")}
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
          disabled={isSubmitting}
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

        {mode === "login" || mode === "register" ? (
          <OAuthLoginButton disable={isSubmitting} />
        ) : null}
      </form>
    </>
  );
}

export default LoginForm;
