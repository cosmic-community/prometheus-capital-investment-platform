import { Calendar, User, FileText } from 'lucide-react'
import Link from 'next/link'
import { MarketInsight } from '@/types'

interface InsightsGridProps {
  insights: MarketInsight[]
}

export default function InsightsGrid({ insights }: InsightsGridProps) {
  if (!insights || insights.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">No Market Insights</h3>
        <p className="text-secondary-600">Market insights will appear here when available.</p>
      </div>
    )
  }

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {insights.map((insight) => (
        <Link 
          key={insight.id} 
          href={`/insights/${insight.slug}`}
          className="block group"
        >
          <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 group-hover:shadow-md group-hover:border-primary-200">
            {insight.metadata?.featured_chart && (
              <div className="overflow-hidden">
                <img 
                  src={`${insight.metadata.featured_chart.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                  alt="Market analysis chart"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            )}
            
            <div className="p-6">
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

                <h3 className="text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {insight.metadata?.insight_title || insight.title}
                </h3>

                <div className="text-secondary-600">
                  {insight.metadata?.content && (
                    <div 
                      className="prose prose-sm line-clamp-4"
                      dangerouslySetInnerHTML={{ 
                        __html: insight.metadata.content.substring(0, 300) + '...' 
                      }} 
                    />
                  )}
                </div>

                <div className="pt-4 border-t border-secondary-200">
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                    {insight.metadata?.market_category?.value || 'Market Analysis'}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}