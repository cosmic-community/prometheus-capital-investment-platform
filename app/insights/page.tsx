import InsightsGrid from '@/components/InsightsGrid'
import { getMarketInsights } from '@/lib/cosmic'

export const metadata = {
  title: 'Market Insights - Prometheus Capital',
  description: 'Latest market insights, analysis, and investment commentary',
}

export default async function InsightsPage() {
  const insights = await getMarketInsights()

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Market Insights
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Stay informed with our latest market analysis, investment commentary, 
            and strategic insights on global markets.
          </p>
        </div>
        <InsightsGrid insights={insights} />
      </div>
    </div>
  )
}