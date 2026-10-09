
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { toBanglaNumber } from "@/utils/banglaNumber";
import CategoryProducts from "@/components/CategoryProducts";


const API = "https://api.abcz.workers.dev/api/bazardor";

async function getCategories() {
  const res = await fetch(`${API}/categories`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load categories");

  return res.json();
}

async function getProducts(slug) {
  const res = await fetch(`${API}/products?category=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load products");

  return res.json();
}

export default async function CategoryPage({
  params,
}) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) notFound();

  const products = await getProducts(slug);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← হোমে ফিরে যান
        </Link>

        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{category.icon}</span>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                এই category-র সব পণ্যের বাজার দর
              </p>
            </div>
          </div>

        </div>

        <CategoryProducts products={products} />
      </div>
    </main>
  );
}
