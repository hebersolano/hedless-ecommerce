import type { searchParamsT } from "@/lib/types";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

function LoginPage({ searchParams }: { searchParams: searchParamsT }) {
  const mode = searchParams.mode;

  const info = new Map([
    ["register", { formTitle: "Register", buttonTitle: "Register" }],
  ]);

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <form className="flex flex-col gap-8">
        <h1 className="text-2xl font-semibold">formTitle**</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="john"
            className="rounded-md px-4 py-2 ring-2 ring-border"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="john@email.com"
            className="rounded-md px-4 py-2 ring-2 ring-border"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder=""
            className="rounded-md px-4 py-2 ring-2 ring-border"
          />
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:cursor-not-allowed disabled:bg-primary/30">
          buttonTitle**
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

function Register() {
  return <form action=""></form>;
}
