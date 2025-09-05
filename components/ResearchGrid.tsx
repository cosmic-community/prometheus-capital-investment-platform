import { Calendar, Lock, FileText, TrendingUp } from 'lucide-react'
import { InvestmentResearch } from '@/types'

interface ResearchGridProps {
  research: InvestmentResearch[]
}

export default function ResearchGrid({ research }: ResearchGridProps) {
  if (!research || research.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">No Research Available</h3>
        <p className="text-secondary-600">Research reports will appear here when available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {research.map((report) => (
        <article key={report.id} className="card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                {report.metadata?.report_title || report.title}
              </h3>
              <p className="text-secondary-600 font-medium">
                {report.metadata?.company_sector}
              </p>
            </div>
            {report.metadata?.confidential && (
              <Lock className="h-5 w-5 text-amber-500" />
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-4 text-sm text-secondary-500">
              <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                {report.metadata?.research_type?.value || 'Research'}
              </span>
              <span className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded text-xs">
                {report.metadata?.investment_category?.value || 'Investment'}
              </span>
            </div>

            {report.metadata?.investment_thesis && (
              <div className="text-secondary-600">
                <div 
                  className="prose prose-sm line-clamp-4"
                  dangerouslySetInnerHTML={{ 
                    __html: report.metadata.investment_thesis.substring(0, 200) + '...' 
                  }} 
                />
              </div>
            )}

            <div className="pt-4 border-t border-secondary-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-secondary-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Investment Analysis</span>
                </div>
                {report.metadata?.confidential ? (
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">
                    Internal Only
                  </span>
                ) : (
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                    Available
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}