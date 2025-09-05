import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { MarketInsight } from '@/types'

interface LatestInsightsProps {
  insights: MarketInsight[]
}

export default function LatestInsights({ insights }: LatestInsightsProps) {
  const displayInsights = insights?.slice(0, 3) || []

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    } catch (error) {
      return dateString
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Latest Market Insights
            </h2>
            <p className="text-lg text-secondary-600">
              Stay informed with our latest analysis and market commentary
            </p>
          </div>
          <Link 
            href="/insights"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            View All Insights
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayInsights.map((insight) => (
            <article key={insight.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {insight.metadata?.featured_chart && (
                <img 
                  src={`${insight.metadata.featured_chart.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                  alt="Market chart"
                  width={300}
                  height={150}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-secondary-500 space-x-4">
                  {insight.metadata?.publication_date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(insight.metadata.publication_date)}</span>
                    </div>
                  )}
                  {insight.metadata?.author && (
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{insight.metadata.author.metadata?.full_name || insight.metadata.author.title}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {insight.metadata?.insight_title || insight.title}
                </h3>

                <div className="text-secondary-600 line-clamp-3">
                  {insight.metadata?.content && (
                    <div 
                      className="prose prose-sm"
                      dangerouslySetInnerHTML={{ 
                        __html: insight.metadata.content.substring(0, 200) + '...' 
                      }} 
                    />
                  )}
                </div>

                <div className="pt-2">
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                    {insight.metadata?.market_category?.value || 'Market Analysis'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}