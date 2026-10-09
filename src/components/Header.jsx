
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navlinks from "./Navlinks";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const today = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignout() {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out failed:", error);
      return;
    }

    router.replace("/signin");
    router.refresh();
  }

  return (
    <div>
      <header className="border-t-4 border-gray-900 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 py-3">
            {/* Logo and date */}
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2 sm:gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 sm:h-10 sm:w-10">
                <Image
                  src="/logo-icon.png"
                  width={32}
                  height={32}
                  alt="বাজার দর"
                  className="h-7 w-7"
                />
              </div>

              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 sm:text-2xl">
                  বাজার দর
                </h1>
                <p className="text-xs text-gray-600 sm:text-sm">
                  {today}
                </p>
              </div>
            </Link>

            {/* Authentication buttons */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {isPending ? (
                <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200 sm:w-32" />
              ) : session ? (
                <>
                  <Link
                    href="/profile"
                    className="rounded-md border border-green-700 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 sm:px-4"
                  >
                    প্রোফাইল
                  </Link>

                  <button
                    onClick={handleSignout}
                    className="rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-800 sm:px-4"
                  >
                    সাইন আউট
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="rounded-md border border-green-700 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 sm:px-4"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-800 sm:px-4"
                  >
                    সাইন আপ
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Category navigation stays unchanged */}
      <Navlinks />
    </div>
  );
};

export default Header;

