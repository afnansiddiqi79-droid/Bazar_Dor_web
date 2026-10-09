
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { toBanglaNumber, unitText } from "@/utils/banglaNumber";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

// Slug দিয়ে নির্দিষ্ট product খুঁজে বের করা
async function getProduct(slug) {
  try {
    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const products = await res.json();

    return products.find((product) => product.slug === slug) ?? null;
  } catch (error) {
    console.error("Product fetch failed:", error);
    return null;
  }
}

export default async function ProductDetails({ params }) {
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  
  if (!session) {
    redirect("/signin");
  }

  
  const { slug } = await params;

  
  const product = await getProduct(slug);

  
  if (!product) {
    notFound();
  }
  
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Home link */}
        <Link
          href="/"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← হোমে ফিরে যান
        </Link>

        {/* Product details */}
        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-4xl">
              {product.image || product.categoryIcon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {unitText[product.unit] ?? product.unit}
              </p>
            </div>
          </div>

          {/* Today's price */}
          <div className="mt-7 rounded-xl bg-green-50 p-5">
            <p className="text-sm text-gray-600">আজকের বাজার দর</p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <p className="text-3xl font-bold text-gray-900">
                {toBanglaNumber(product.today)} টাকা
              </p>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  isUp
                    ? "bg-red-100 text-red-700"
                    : isDown
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {toBanglaNumber(Math.abs(product.change?.pct ?? 0))}%
              </span>
            </div>
          </div>

          {/* Price history */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "গতকাল", value: product.yesterday },
              { label: "গত সপ্তাহ", value: product.lastWeek },
              { label: "গত মাস", value: product.lastMonth },
              { label: "আজকের দাম", value: product.today },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-gray-200 p-4"
              >
                <p className="text-xs text-gray-500">{item.label}</p>

                <p className="mt-2 font-bold text-gray-900">
                  {toBanglaNumber(item.value)} টাকা
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Market-wise prices */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900">
            বাজারভিত্তিক দাম
          </h2>

          {!product.markets?.length ? (
            <p className="mt-4 text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="px-3 py-3">বাজার</th>
                    <th className="px-3 py-3">বিভাগ</th>
                    <th className="px-3 py-3">সর্বনিম্ন</th>
                    <th className="px-3 py-3">সর্বোচ্চ</th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market) => (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-3 py-3 font-medium text-gray-800">
                        {market.market}
                      </td>

                      <td className="px-3 py-3 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-3 py-3 text-green-700">
                        {toBanglaNumber(market.min)} টাকা
                      </td>

                      <td className="px-3 py-3 text-red-600">
                        {toBanglaNumber(market.max)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

