
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-4xl">
          🛒
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-green-700">
          Error 404
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
          হয়তো লিংকটি ভুল অথবা পেজটি আর নেই।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
