
import Link from "next/link";
import { toBanglaNumber, unitText } from "@/utils/banglaNumber";





const ProductCard = ({ product }) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isSame = product.change.dir === "same";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-3 transition hover:border-green-300 hover:shadow-sm"
    >
      <div className="flex items-start gap-3">
        {/* Product icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-xl">
          {product.image || product.categoryIcon}
        </div>

        {/* Product name */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-800">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            {unitText[product.unit] ?? product.unit}
          </p>
        </div>
      </div>

      {/* Today's price */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের বাজার দর</p>

          <p className="mt-0.5 text-sm font-bold text-gray-900">
            {toBanglaNumber(product.today)} টাকা
          </p>
        </div>

        {/* Price change badge */}
        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {toBanglaNumber(Math.abs(product.change.pct))}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;