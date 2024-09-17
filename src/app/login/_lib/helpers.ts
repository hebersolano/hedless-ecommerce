import type { LoginInputs, Mode } from "./login-types";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LoginState, type OauthData, type StateMachine } from "@wix/sdk";
import { WixClientT } from "@/context/WixContext";
import { setSessionTokens } from "@/lib/helpers/setSessionTokens";
import { UseFormSetError } from "react-hook-form";

const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;
const LOGIN_URI = process.env.NEXT_PUBLIC_LOGIN_URI!;

export function getOAuthData(wixClient: WixClientT): OauthData {
  const localOAuthData = localStorage.getItem("oauth-data");
  if (localOAuthData) return JSON.parse(localOAuthData);

  const oauthData = wixClient.auth.generateOAuthData(REDIRECT_URI, LOGIN_URI);
  localStorage.setItem("oauth-data", JSON.stringify(oauthData));
  return oauthData;
}

export async function getOAuthURL(wixClient: WixClientT) {
  const oauthData = getOAuthData(wixClient);
  const { authUrl } = await wixClient.auth.getAuthUrl(oauthData);
  return authUrl;
}

type SubmitData = {
  mode: Mode;
  wixClient: WixClientT;
  formData: LoginInputs;
  stateToken: string;
};

type Response = StateMachine | undefined;

export async function handleSubmitData({
  mode,
  wixClient,
  formData,
  stateToken,
}: SubmitData) {
  let response: Response = undefined;

  switch (mode) {
    case "login":
      response = await wixClient.auth.login({
        email: formData.email,
        password: formData.password,
      });
      break;

    case "register":
      response = await wixClient.auth.register({
        email: formData.email,
        password: formData.password,
        profile: { nickname: formData.username },
      });
      break;

    case "verification":
      if (!formData.code || !stateToken) break;
      response = await wixClient.auth.processVerification(
        {
          verificationCode: formData.code,
        },
        {
          data: { stateToken },
          loginState: LoginState.EMAIL_VERIFICATION_REQUIRED,
        },
      );
      break;
  }

  return response;
}

type SubmitResponseParams = {
  response: Response;
  wixClient: WixClientT;
  router: AppRouterInstance;
  setError: UseFormSetError<LoginInputs>;
};

export async function handleSubmitResponse({
  response,
  wixClient,
  router,
  setError,
}: SubmitResponseParams) {
  if (!response) return;

  switch (response.loginState) {
    case LoginState.EMAIL_VERIFICATION_REQUIRED:
      response.loginState;
      router.push(`?f=verification&st=${response.data.stateToken}`);
      break;

    case LoginState.SUCCESS:
      console.log("success");
      const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
        response.data.sessionToken,
      );
      setSessionTokens(tokens);
      wixClient.auth.setTokens(tokens);
      router.replace("/");
      break;

    case LoginState.FAILURE:
      if (response.errorCode === "invalidEmail")
        setError("email", { type: "manual", message: "Invalid email" });
      console.log("failure");
      if (response.errorCode === "invalidPassword")
        setError("password", { type: "manual", message: "Invalid password" });
      console.log("failure");
      break;
  }
}
