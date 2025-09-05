import { Building2, TrendingUp, Calendar, DollarSign } from 'lucide-react'
import { PortfolioCompany } from '@/types'
import { format } from 'date-fns'

interface PortfolioGridProps {
  companies: PortfolioCompany[]
}

export default function PortfolioGrid({ companies }: PortfolioGridProps) {
  if (!companies || companies.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">No Portfolio Companies</h3>
        <p className="text-secondary-600">Portfolio companies will appear here when available.</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-800'
      case 'exited':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-secondary-100 text-secondary-800'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {companies.map((company) => (
        <article key={company.id} className="card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                {company.metadata?.company_name || company.title}
              </h3>
              {company.metadata?.ticker_symbol && (
                <p className="text-primary-600 font-medium text-sm mb-1">
                  {company.metadata.ticker_symbol}
                </p>
              )}
              <p className="text-secondary-600">
                {company.metadata?.industry_sector}
              </p>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              getStatusColor(company.metadata?.current_status?.value || '')
            }`}>
              {company.metadata?.current_status?.value || 'Unknown'}
            </span>
          </div>

          <div className="space-y-4">
            {company.metadata?.company_description && (
              <div className="text-secondary-600">
                <div 
                  className="prose prose-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: company.metadata.company_description.substring(0, 200) + '...' 
                  }} 
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              {company.metadata?.investment_date && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-secondary-400 mr-2" />
                  <div>
                    <div className="text-secondary-500">Invested</div>
                    <div className="font-medium text-secondary-900">
                      {format(new Date(company.metadata.investment_date), 'MMM yyyy')}
                    </div>
                  </div>
                </div>
              )}
              
              {company.metadata?.initial_investment && (
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-secondary-400 mr-2" />
                  <div>
                    <div className="text-secondary-500">Investment</div>
                    <div className="font-medium text-secondary-900">
                      {company.metadata.initial_investment}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {company.metadata?.key_metrics && Object.keys(company.metadata.key_metrics).length > 0 && (
              <div className="pt-4 border-t border-secondary-200">
                <div className="text-xs text-secondary-500 mb-2">Key Metrics</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(company.metadata.key_metrics).slice(0, 4).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-secondary-500 capitalize">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="ml-1 font-medium text-secondary-900">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}