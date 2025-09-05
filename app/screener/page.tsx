import StockScreener from '@/components/StockScreener'

export const metadata = {
  title: 'Stock Screener - Prometheus Capital',
  description: 'AI-powered stock screening tool for long-term value investment analysis',
}

export default function ScreenerPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            AI-Powered Stock Screener
          </h1>
          <p className="text-secondary-600 text-lg">
            Identify long-term value investment opportunities with customizable filters and AI analysis
          </p>
        </div>
        <StockScreener />
      </div>
    </div>
  )
}