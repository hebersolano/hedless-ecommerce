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
};

type Response = StateMachine | undefined;

export async function handleSubmitData({
  mode,
  wixClient,
  formData,
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
      const stateToken = sessionStorage.getItem("stateToken");
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
      sessionStorage.removeItem("stateToken");
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
      sessionStorage.setItem("stateToken", response.data.stateToken);
      router.push("?f=verification");
      break;

    case LoginState.SUCCESS:
      const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
        response.data.sessionToken,
      );
      wixClient.auth.setTokens(tokens);
      setSessionTokens(tokens);
      router.replace("/");
      break;

    case LoginState.FAILURE: {
      console.log("response failure", response.errorCode);

      switch (response.errorCode) {
        case "invalidEmail":
        case "emailAlreadyExists":
        case "invalidPassword":
          setError("email", {
            type: "manual",
            message: "Invalid email or password",
          });
          break;

        case "resetPassword":
          setError("password", {
            type: "manual",
            message: "You need to reset your password",
          });
          setTimeout(() => router.push("?f=reset"), 3000);
          break;

        default:
          console.log("unhandled Failure", response);
          break;
      }
      break;
    } //end of failure case handler
  }
}
