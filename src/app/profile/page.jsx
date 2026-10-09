
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleSignout() {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setMessage(error.message || "Sign out করা যায়নি।");
        return;
      }

      router.replace("/signin");
      router.refresh();
    } catch {
      setMessage("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0]">
        <p className="text-gray-600">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-[65vh] bg-[#f0f5f0] px-4 py-12">
      <section className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>
            </div>

            <button
              onClick={handleSignout}
              disabled={loading}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করো..." : "সাইন আউট"}
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">অ্যাকাউন্টের তথ্য</h2>

          <p className="mt-2 text-sm text-gray-500">
            পরবর্তী ধাপে এখানে নাম পরিবর্তনের সুবিধা যোগ করব।
          </p>

          <Link
            href="/profile/update"
            className="mt-5 inline-flex rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            তথ্য আপডেট করুন
          </Link>

          {message && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {message}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}