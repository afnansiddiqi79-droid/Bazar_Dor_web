import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { toBanglaNumber, unitText } from "../utils/banglaNumber";


const Marquee = async () => {
  let data = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    data = await res.json();
  } catch (error) {
    console.error("Marquee API error:", error);
  }

  if (!data.length) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="overflow-hidden">
        <MarqueeText
          direction="right"
          duration={25}
        >
          {data.map((product) => {
            const isUp = product.change.dir === "up";

            return (
              <span
                key={product.id}
                className="mx-5 inline-flex items-center whitespace-nowrap py-2 text-sm"
              >
                {/* Emoji */}
                <span className="mr-1.5">
                  {product.categoryIcon}
                </span>

                {/* Product name */}
                <span className="font-medium text-gray-700">
                  {product.nameBn}
                </span>

                {/* Price */}
                <span className="mx-1.5 text-gray-600">
                  {toBanglaNumber(product.today)} টাকা
                </span>

                {/* Unit */}
                <span className="text-gray-500">
                  {unitText[product.unit] ?? product.unit}
                </span>

                {/* Change */}
                <span
                  className={`ml-2 font-semibold ${
                    isUp
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {isUp ? "▲" : "▼"}{" "}
                  {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>

                {/* Separator */}
                <span className="ml-5 text-gray-300">
                  |
                </span>
              </span>
            );
          })}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;