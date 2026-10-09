
"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SocialLogin from "@/components/auth/SocialLogin";
import toast from "react-hot-toast";
export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    
try {
  const { error } = await authClient.signUp.email({
    name,
    email,
    password,
  });

  if (error) {
    const message =
      error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।";

    setMessage(message);
    toast.error(message);
    return;
  }

  toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
  router.push("/signin");
} catch {
  const message = "সমস্যা হয়েছে। আবার চেষ্টা করো।";

  setMessage(message);
  toast.error(message);
} finally {
  setLoading(false);
}
  }
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#f0f5f0] px-4 py-12">
      <section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বাজার দর-এর সঙ্গে যুক্ত হয়ে বাজারের দাম জানুন।
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              নাম
            </label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="আপনার সম্পূর্ণ নাম"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              required
            />
            

          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
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
      autoComplete="new-password"
      placeholder="কমপক্ষে ৮ অক্ষর"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      minLength={8}
      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-11 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
      aria-pressed={showPassword}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-green-700"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
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
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </section>
    </main>
  );
}