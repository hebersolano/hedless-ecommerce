"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("id");

  useEffect(function () {
    if (!orderId) return;

    let timer = setTimeout(() => {
      router.push("/order/" + orderId);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-gree-700 text-6xl">Successful</h1>
      <h2 className="text-xl font-medium">
        We sent the invoice to your e-mail
      </h2>
      <h3>You are being redirected to the order page...</h3>
    </div>
  );
}

export default SuccessPage;
