"use client";

import useWixClient from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";
import { getOAuthData } from "../_lib/helpers";
import { useEffect, useState } from "react";
import { PropagateLoader, SyncLoader } from "react-spinners";

function CallbackPage() {
  const [state, setState] = useState("authenticating");
  const wixClient = useWixClient();
  const router = useRouter();

  useEffect(function () {
    const returnedOAuthData = wixClient.auth.parseFromUrl();
    if (returnedOAuthData.error) {
      console.log(
        returnedOAuthData.error,
        `Error: ${returnedOAuthData.errorDescription}`,
      );
      setState("error");
      router.replace("/");
    }

    const oAuthData = getOAuthData(wixClient);

    wixClient.auth
      .getMemberTokens(
        returnedOAuthData.code,
        returnedOAuthData.state,
        oAuthData,
      )
      .then((memberTokens) => {
        wixClient.auth.setTokens(memberTokens);
        setState("authenticated");
      })
      .catch(() => setState("unauthenticated"))
      .finally(() => setTimeout(() => router.replace("/"), 3000));
  }, []);

  return (
    <div className="fixed inset-x-0 inset-y-0 flex flex-col items-center justify-center gap-8 bg-background">
      <PropagateLoader size={18} color="hsl(var(--primary))" />
      {state === "authenticating" && <p>Verifying...</p>}
      {state == "authenticated" && <p>Welcome, redirecting...</p>}
      {state == "unauthenticated" && <p>No data, redirecting...</p>}
    </div>
  );
}

export default CallbackPage;
