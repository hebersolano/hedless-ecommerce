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
