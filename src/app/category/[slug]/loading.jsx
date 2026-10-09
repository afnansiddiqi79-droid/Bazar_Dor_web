
export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Back link placeholder */}
        <div className="h-4 w-32 rounded bg-gray-200" />

        {/* Category heading placeholder */}
        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gray-200" />

            <div className="space-y-2">
              <div className="h-6 w-28 rounded bg-gray-200" />
              <div className="h-4 w-48 rounded bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Product card placeholders */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              </div>

              <div className="mt-5 h-5 w-24 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
