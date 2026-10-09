
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SocialLogin() {
  const [loadingProvider, setLoadingProvider] = useState("");

  async function handleSocialLogin(provider) {
    setLoadingProvider(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/signin?error=social",
      });

      if (error) {
        toast.error(error.message || "Social login করা যায়নি");
        setLoadingProvider("");
      }
    } catch {
      toast.error("Login করতে সমস্যা হয়েছে। আবার চেষ্টা করো।");
      setLoadingProvider("");
    }
  }

  return (
    <div className="mt-5 grid gap-3">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        disabled={Boolean(loadingProvider)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50 disabled:opacity-60"
      >
        {loadingProvider === "google"
          ? "Google-এ যাচ্ছি..."
          : "Google দিয়ে Continue"}
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        disabled={Boolean(loadingProvider)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50 disabled:opacity-60"
      >
        {loadingProvider === "github"
          ? "GitHub-এ যাচ্ছি..."
          : "GitHub দিয়ে Continue"}
      </button>
    </div>
  );
}

