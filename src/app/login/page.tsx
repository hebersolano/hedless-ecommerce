import type { searchParamsT } from "@/lib/types";
import LoginForm from "./_lib/LoginForm";
import { FormMode, Mode } from "./_lib/login-types";

const formModes = new Map<Mode, FormMode>([
  [
    "login",
    {
      mode: "login",
      formTitle: "Login",
      buttonTitle: "Login",
      username: false,
      email: true,
      password: true,
    },
  ],
  [
    "register",
    {
      mode: "register",
      formTitle: "Register",
      buttonTitle: "Sign up",
      username: true,
      email: true,
      password: true,
    },
  ],
  [
    "reset",
    {
      mode: "reset",
      formTitle: "Reset Password",
      buttonTitle: "Get Code",
      username: false,
      email: true,
      password: false,
    },
  ],
  [
    "verification",
    {
      mode: "verification",
      formTitle: "Verify email",
      buttonTitle: "Verify",
      username: false,
      email: false,
      password: false,
    },
  ],
]);

function LoginPage({ searchParams }: { searchParams: searchParamsT }) {
  const paramMode = searchParams.f || "login";
  const stateToken = searchParams.st || "";
  const formMode = formModes.get(paramMode as Mode) as FormMode;

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-6 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <LoginForm formMode={formMode} stateToken={stateToken} />
    </div>
  );
}

export default LoginPage;
