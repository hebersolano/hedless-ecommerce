export type Mode = "login" | "register" | "reset" | "verification";

export type FormMode = {
  mode: Mode;
  formTitle: string;
  buttonTitle: string;
  username: boolean;
  email: boolean;
  password: boolean;
};

export type LoginInputs = {
  username: string;
  email: string;
  password: string;
  validatePassword: string;
  code: string;
};

export const formModes = new Map<Mode, FormMode>([
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
