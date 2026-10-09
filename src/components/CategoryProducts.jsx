
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";



export default function CategoryProducts({
  products,
}) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <div className="mt-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          মোট {products.length}টি পণ্য
        </p>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-600"
          aria-label="দাম অনুযায়ী সাজান"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-high">দাম: কম থেকে বেশি</option>
          <option value="high-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          এই category-তে কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
