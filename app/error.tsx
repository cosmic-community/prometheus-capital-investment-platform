'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Something went wrong!</h2>
        <p className="text-secondary-600 mb-6">
          An error occurred while loading this page. Please try again.
        </p>
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  )
}