
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }

    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [isPending, session, router]);

  async function handleUpdate(e) {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    const trimmedName = name.trim();

    if (!trimmedName) {
      setMessage("নাম লিখতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        setMessage(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setSuccess(true);
      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch {
      setMessage("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0]">
        <p className="text-gray-600">লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <main className="min-h-[65vh] bg-[#f0f5f0] px-4 py-12">
      <section className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">
          তথ্য আপডেট করুন
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>

        <form
          onSubmit={handleUpdate}
          className="mt-6 space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              maxLength={100}
              className="w-full rounded-lg border border-gray-200 px-3 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {message && (
            <p
              role="status"
              className={`text-sm ${
                success ? "text-green-700" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </button>

            <Link
              href="/profile"
              className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ফিরে যান
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}