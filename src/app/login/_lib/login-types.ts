export type Mode = "login" | "register" | "reset" | "verification";

export type FormMode = {
  mode: Mode;
  formTitle: string;
  buttonTitle: string;
  username: boolean;
  email: boolean;
  password: boolean;
};
