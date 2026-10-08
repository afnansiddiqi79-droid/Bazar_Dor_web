"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";



const Navlinks = () => {
  const pathname = usePathname();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(data);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="
            flex
            items-center
            justify-center
            gap-1
            overflow-x-auto
            py-2
            scrollbar-hide
            sm:justify-start
            sm:gap-2
          "
        >
          {/* Home */}
          <Link
            href="/"
            className={`
              flex shrink-0 items-center gap-1.5
              rounded-lg px-3 py-2
              text-sm font-medium
              transition
              ${
                pathname === "/"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <span>🏠</span>
            <span>হোম</span>
          </Link>

          {/* Loading */}
          {loading ? (
            <>
              <div className="h-9 w-16 shrink-0 animate-pulse rounded-lg bg-gray-100" />

              <div className="h-9 w-16 shrink-0 animate-pulse rounded-lg bg-gray-100" />

              <div className="h-9 w-16 shrink-0 animate-pulse rounded-lg bg-gray-100" />
            </>
          ) : (
            /* Categories */
            categories.map((category) => {
              const isActive =
                pathname === `/category/${category.slug}`;

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={`
                    flex shrink-0 items-center gap-1.5
                    rounded-lg px-3 py-2
                    text-sm font-medium
                    transition
                    ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;