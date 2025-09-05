'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, TrendingUp, TrendingDown, BarChart3, Zap } from 'lucide-react'
import { mockStockData, filterStocks, getSectors } from '@/lib/stock-data'
import { StockScreenerFilters, StockData } from '@/types'
import { formatMarketCap, formatPercentage } from '@/lib/stock-data'
import Modal from '@/components/Modal'

export default function StockScreener() {
  const [filters, setFilters] = useState<StockScreenerFilters>({})
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>(mockStockData)
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)

  const sectors = getSectors()

  useEffect(() => {
    const filtered = filterStocks(mockStockData, filters)
    setFilteredStocks(filtered)
  }, [filters])

  const handleFilterChange = (key: keyof StockScreenerFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const analyzeStock = async (stock: StockData) => {
    setSelectedStock(stock)
    setIsAnalyzing(true)
    setAiAnalysis('')
    setShowAnalysisModal(true)

    // Simulate AI analysis
    setTimeout(() => {
      const analysis = `
        **Investment Analysis for ${stock.name} (${stock.symbol})**
        
        **Investment Score: 82/100**
        
        **Key Strengths:**
        • Strong market position with ${formatMarketCap(stock.marketCap)} market cap
        • Healthy profit margins at ${formatPercentage(stock.profitMargin)}
        • Revenue growth of ${formatPercentage(stock.revenueGrowth)} demonstrates business expansion
        • ROE of ${formatPercentage(stock.roe)} indicates efficient capital utilization
        
        **Risk Factors:**
        • P/E ratio of ${stock.peRatio} may indicate premium valuation
        • Debt-to-equity ratio should be monitored
        • Sector-specific risks in ${stock.sector}
        
        **Recommendation: BUY**
        
        This stock demonstrates strong fundamentals aligned with long-term value investment principles. 
        The company shows consistent profitability and growth potential, making it suitable for a 
        diversified portfolio focused on sustainable returns.
        
        **Technical Analysis:**
        Based on historical price movements and trading volume, the stock shows strong momentum with 
        support levels holding firm. The current price action suggests potential for continued upward 
        movement, though investors should monitor broader market conditions.
        
        **Financial Health Score: A-**
        The company maintains a strong balance sheet with manageable debt levels and consistent cash flow 
        generation. This financial stability provides a solid foundation for long-term investment returns.
      `
      setAiAnalysis(analysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const closeAnalysisModal = () => {
    setShowAnalysisModal(false)
    setSelectedStock(null)
    setAiAnalysis('')
    setIsAnalyzing(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Panel */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-secondary-900">Filters</h3>
              <button
                onClick={() => setFilters({})}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {/* Market Cap */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Market Cap (Billions)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="input-field text-sm"
                    value={filters.marketCap?.min || ''}
                    onChange={(e) => handleFilterChange('marketCap', {
                      ...filters.marketCap,
                      min: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="input-field text-sm"
                    value={filters.marketCap?.max || ''}
                    onChange={(e) => handleFilterChange('marketCap', {
                      ...filters.marketCap,
                      max: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
              </div>

              {/* P/E Ratio */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  P/E Ratio
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="input-field text-sm"
                    value={filters.peRatio?.min || ''}
                    onChange={(e) => handleFilterChange('peRatio', {
                      ...filters.peRatio,
                      min: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="input-field text-sm"
                    value={filters.peRatio?.max || ''}
                    onChange={(e) => handleFilterChange('peRatio', {
                      ...filters.peRatio,
                      max: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
              </div>

              {/* Sector */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Sectors
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {sectors.map((sector) => (
                    <label key={sector} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        checked={filters.sector?.includes(sector) || false}
                        onChange={(e) => {
                          const currentSectors = filters.sector || []
                          if (e.target.checked) {
                            handleFilterChange('sector', [...currentSectors, sector])
                          } else {
                            handleFilterChange('sector', currentSectors.filter(s => s !== sector))
                          }
                        }}
                      />
                      <span className="ml-2 text-sm text-secondary-700">{sector}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Revenue Growth */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Min Revenue Growth (%)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 5"
                  className="input-field text-sm w-full"
                  value={filters.revenueGrowth?.min || ''}
                  onChange={(e) => handleFilterChange('revenueGrowth', {
                    min: e.target.value ? parseFloat(e.target.value) : undefined
                  })}
                />
              </div>

              {/* Profit Margin */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Min Profit Margin (%)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 10"
                  className="input-field text-sm w-full"
                  value={filters.profitMargin?.min || ''}
                  onChange={(e) => handleFilterChange('profitMargin', {
                    min: e.target.value ? parseFloat(e.target.value) : undefined
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Results Header */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-secondary-900">
                Stock Results ({filteredStocks.length} companies)
              </h3>
            </div>
            
            <p className="text-secondary-600">
              AI-powered analysis of companies meeting your investment criteria for long-term value opportunities.
            </p>
          </div>

          {/* Stock List */}
          <div className="space-y-4 mb-6">
            {filteredStocks.map((stock) => (
              <div key={stock.symbol} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="text-lg font-semibold text-secondary-900">
                        {stock.name}
                      </h4>
                      <p className="text-secondary-600">{stock.symbol} • {stock.sector}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-xl font-bold text-secondary-900">
                        ${stock.price.toFixed(2)}
                      </div>
                      <div className={`flex items-center text-sm ${
                        stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.changePercent >= 0 ? 
                          <TrendingUp className="h-4 w-4 mr-1" /> : 
                          <TrendingDown className="h-4 w-4 mr-1" />
                        }
                        {stock.changePercent >= 0 ? '+' : ''}{formatPercentage(stock.changePercent)}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => analyzeStock(stock)}
                      className="btn-primary flex items-center"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      AI Analysis
                    </button>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 pt-4 border-t border-secondary-200">
                  <div>
                    <div className="text-xs text-secondary-500">Market Cap</div>
                    <div className="font-semibold text-secondary-900">
                      {formatMarketCap(stock.marketCap)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-secondary-500">P/E Ratio</div>
                    <div className="font-semibold text-secondary-900">{stock.peRatio}</div>
                  </div>
                  <div>
                    <div className="text-xs text-secondary-500">Revenue Growth</div>
                    <div className="font-semibold text-secondary-900">
                      {formatPercentage(stock.revenueGrowth)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-secondary-500">Profit Margin</div>
                    <div className="font-semibold text-secondary-900">
                      {formatPercentage(stock.profitMargin)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-secondary-500">ROE</div>
                    <div className="font-semibold text-secondary-900">
                      {formatPercentage(stock.roe)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Analysis Modal */}
      <Modal 
        isOpen={showAnalysisModal}
        onClose={closeAnalysisModal}
        title={selectedStock ? `AI Investment Analysis: ${selectedStock.name}` : 'AI Investment Analysis'}
        maxWidth="4xl"
      >
        <div className="space-y-6">
          {selectedStock && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-lg font-semibold text-secondary-900">
                    {selectedStock.name} ({selectedStock.symbol})
                  </h4>
                  <p className="text-secondary-600">{selectedStock.sector}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary-900">
                    ${selectedStock.price.toFixed(2)}
                  </div>
                  <div className={`flex items-center justify-end text-sm ${
                    selectedStock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedStock.changePercent >= 0 ? 
                      <TrendingUp className="h-4 w-4 mr-1" /> : 
                      <TrendingDown className="h-4 w-4 mr-1" />
                    }
                    {selectedStock.changePercent >= 0 ? '+' : ''}{formatPercentage(selectedStock.changePercent)}
                  </div>
                </div>
              </div>

              {/* Key Metrics in Modal */}
              <div className="grid grid-cols-5 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-xs text-secondary-500">Market Cap</div>
                  <div className="font-semibold text-secondary-900">
                    {formatMarketCap(selectedStock.marketCap)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-secondary-500">P/E Ratio</div>
                  <div className="font-semibold text-secondary-900">{selectedStock.peRatio}</div>
                </div>
                <div>
                  <div className="text-xs text-secondary-500">Revenue Growth</div>
                  <div className="font-semibold text-secondary-900">
                    {formatPercentage(selectedStock.revenueGrowth)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-secondary-500">Profit Margin</div>
                  <div className="font-semibold text-secondary-900">
                    {formatPercentage(selectedStock.profitMargin)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-secondary-500">ROE</div>
                  <div className="font-semibold text-secondary-900">
                    {formatPercentage(selectedStock.roe)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold text-secondary-900">
                AI-Powered Investment Analysis
              </h3>
            </div>

            {isAnalyzing ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-3 text-secondary-600">Analyzing with AI...</span>
              </div>
            ) : aiAnalysis ? (
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: aiAnalysis.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, '<br />')
                    .replace(/• /g, '<br />• ')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>')
                }} />
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-600">AI analysis will appear here once processing is complete.</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}