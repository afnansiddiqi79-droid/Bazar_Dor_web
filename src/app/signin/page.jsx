"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SocialLogin from "@/components/auth/SocialLogin";
import { Eye, EyeOff } from "lucide-react";

export default function SigninPage() {
const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

async function handleSignin(e) {
e.preventDefault();
setMessage("");
setLoading(true);


try {
  const { error } = await authClient.signIn.email({
    email,
    password,
  });

  if (error) {
    const errorMessage =
      error.message || "Login failed. আবার চেষ্টা করো।";

    setMessage(errorMessage);
    toast.error(errorMessage);
    return;
  }

  toast.success("সফলভাবে লগইন হয়েছে!");
  router.push("/");
  router.refresh();
} catch {
  const errorMessage = "সমস্যা হয়েছে। আবার চেষ্টা করো।";

  setMessage(errorMessage);
  toast.error(errorMessage);
} finally {
  setLoading(false);
}


}

return ( <main className="flex min-h-[65vh] items-center justify-center bg-[#f0f5f0] px-4 py-12"> <section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"> <h1 className="text-center text-2xl font-bold text-gray-900">
সাইন ইন </h1>


    <p className="mb-7 mt-2 text-center text-sm text-gray-500">
      বাজার দর-এ প্রবেশ করতে সাইন ইন করুন।
    </p>

    <form onSubmit={handleSignin} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium"
        >
          ইমেইল
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium"
        >
          পাসওয়ার্ড
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="আপনার পাসওয়ার্ড"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-11 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            aria-label={
              showPassword
                ? "পাসওয়ার্ড লুকান"
                : "পাসওয়ার্ড দেখুন"
            }
            aria-pressed={showPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-green-700"
          >
            {showPassword ? (
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
          </button>
        </div>
      </div>

      {message && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
      </button>
    </form>

    <div className="my-4 text-center text-sm text-gray-500">
      অথবা social account দিয়ে
    </div>

    <SocialLogin />

    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-xs text-gray-500">অথবা</span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>

    <p className="text-center text-sm text-gray-600">
      অ্যাকাউন্ট নেই?{" "}
      <Link
        href="/signup"
        className="font-semibold text-green-700 hover:underline"
      >
        সাইন আপ করুন
      </Link>
    </p>
  </section>
</main>

);
}
