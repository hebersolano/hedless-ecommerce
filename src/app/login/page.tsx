import type { searchParamsT } from "@/lib/types";
import LoginForm from "./_lib/LoginForm";
import { FormMode } from "./_lib/login-types";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

type Modes = "login" | "register" | "reset";

const formModes = new Map<Modes, FormMode>([
  [
    "login",
    {
      mode: "login",
      formTitle: "Login",
      buttonTitle: "Login",
      username: true,
      email: false,
      password: true,
    },
  ],
  [
    "register",
    {
      mode: "register",
      formTitle: "Register",
      buttonTitle: "Legist",
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
]);

function LoginPage({ searchParams }: { searchParams: searchParamsT }) {
  const paramMode = searchParams.f || "login";
  const formMode = formModes.get(paramMode as Modes) as FormMode;
  console.log(formMode);

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <LoginForm formMode={formMode} />
    </div>
  );
}

export default LoginPage;

function Register() {
  return <form action=""></form>;
}
