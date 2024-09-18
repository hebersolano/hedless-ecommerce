import type { searchParamsT } from "@/lib/types";
import LoginForm from "./_lib/LoginForm";
import { FormMode, formModes, Mode } from "./_lib/login-types";

function LoginPage({ searchParams }: { searchParams: searchParamsT }) {
  const paramMode = searchParams.f || "login";
  const formMode = formModes.get(paramMode as Mode) as FormMode;

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-6 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <LoginForm formMode={formMode} />
    </div>
  );
}

export default LoginPage;
