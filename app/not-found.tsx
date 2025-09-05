import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="text-center max-w-md">
        <h2 className="text-6xl font-bold text-primary-600 mb-4">404</h2>
        <h1 className="text-2xl font-bold text-secondary-900 mb-4">Page Not Found</h1>
        <p className="text-secondary-600 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  )
}