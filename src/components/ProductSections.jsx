
import ProductCard from "@/components/ProductCard";



const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

async function getProducts() {
  try {
    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return await res.json();
  } catch (error) {
    console.error("Products API error:", error);
    return [];
  }
}

function ProductGrid({
  products,
}) {
  if (products.length === 0) {
    return (
      <p className="py-5 text-sm text-gray-500">
        কোনো পণ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

const ProductSections = async () => {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6">
      {/* Rising prices */}
      <div>
        <h2 className="mb-4 text-base font-bold text-gray-900">
          <span className="mr-2 text-red-600">▲</span>
          আজ দাম বেড়েছে
        </h2>

        <ProductGrid products={risers} />
      </div>

      {/* Falling prices */}
      <div>
        <h2 className="mb-4 text-base font-bold text-gray-900">
          <span className="mr-2 text-green-600">▼</span>
          আজ দাম কমেছে
        </h2>

        <ProductGrid products={fallers} />
      </div>

      {/* All products */}
      <div id="all-products">
        <h2 className="mb-1 text-base font-bold text-gray-900">
          সব পণ্য
        </h2>

        <p className="mb-4 text-xs text-gray-500">
          মোট {products.length}টি পণ্যের বাজার দর
        </p>

        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export default ProductSections;
