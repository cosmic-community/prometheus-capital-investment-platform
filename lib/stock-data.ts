import { StockData, StockScreenerFilters } from '@/types';

// Mock stock data for demonstration
// In production, this would connect to real financial data APIs
export const mockStockData: StockData[] = [
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 384.52,
    change: 5.23,
    changePercent: 1.38,
    marketCap: 2850.5,
    peRatio: 28.5,
    sector: 'Technology',
    industry: 'Software',
    revenueGrowth: 12.1,
    profitMargin: 36.2,
    dividendYield: 0.72,
    debtToEquity: 0.31,
    roa: 16.8,
    roe: 38.4,
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 192.35,
    change: -2.15,
    changePercent: -1.10,
    marketCap: 2956.8,
    peRatio: 25.2,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    revenueGrowth: 2.8,
    profitMargin: 25.3,
    dividendYield: 0.44,
    debtToEquity: 1.73,
    roa: 22.1,
    roe: 160.7,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.87,
    change: 1.92,
    changePercent: 1.36,
    marketCap: 1798.6,
    peRatio: 23.8,
    sector: 'Technology',
    industry: 'Internet Services',
    revenueGrowth: 13.8,
    profitMargin: 21.1,
    dividendYield: 0.00,
    debtToEquity: 0.11,
    roa: 13.7,
    roe: 24.8,
  },
  {
    symbol: 'BRK.A',
    name: 'Berkshire Hathaway Inc.',
    price: 544280.00,
    change: 2850.00,
    changePercent: 0.53,
    marketCap: 784.2,
    peRatio: 9.2,
    sector: 'Financial Services',
    industry: 'Insurance',
    revenueGrowth: 8.4,
    profitMargin: 18.9,
    dividendYield: 0.00,
    debtToEquity: 0.28,
    roa: 4.9,
    roe: 12.8,
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    price: 157.83,
    change: 0.94,
    changePercent: 0.60,
    marketCap: 379.4,
    peRatio: 15.1,
    sector: 'Healthcare',
    industry: 'Pharmaceuticals',
    revenueGrowth: 1.5,
    profitMargin: 17.3,
    dividendYield: 3.05,
    debtToEquity: 0.46,
    roa: 9.2,
    roe: 23.1,
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    price: 284.61,
    change: 4.23,
    changePercent: 1.51,
    marketCap: 584.3,
    peRatio: 32.1,
    sector: 'Financial Services',
    industry: 'Payment Processing',
    revenueGrowth: 9.6,
    profitMargin: 51.4,
    dividendYield: 0.74,
    debtToEquity: 0.68,
    roa: 15.8,
    roe: 38.7,
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    price: 167.45,
    change: -0.85,
    changePercent: -0.50,
    marketCap: 398.2,
    peRatio: 24.8,
    sector: 'Consumer Staples',
    industry: 'Personal Care Products',
    revenueGrowth: 2.1,
    profitMargin: 18.7,
    dividendYield: 2.33,
    debtToEquity: 0.52,
    roa: 7.8,
    roe: 32.4,
  },
  {
    symbol: 'HD',
    name: 'Home Depot Inc.',
    price: 394.26,
    change: 6.12,
    changePercent: 1.58,
    marketCap: 398.7,
    peRatio: 26.4,
    sector: 'Consumer Discretionary',
    industry: 'Home Improvement',
    revenueGrowth: 4.3,
    profitMargin: 10.1,
    dividendYield: 2.42,
    debtToEquity: 1.01,
    roa: 16.7,
    roe: 2847.3,
  },
];

export function filterStocks(stocks: StockData[], filters: StockScreenerFilters): StockData[] {
  return stocks.filter(stock => {
    // Market Cap filter
    if (filters.marketCap?.min && stock.marketCap < filters.marketCap.min) return false;
    if (filters.marketCap?.max && stock.marketCap > filters.marketCap.max) return false;
    
    // P/E Ratio filter
    if (filters.peRatio?.min && stock.peRatio < filters.peRatio.min) return false;
    if (filters.peRatio?.max && stock.peRatio > filters.peRatio.max) return false;
    
    // Sector filter
    if (filters.sector && filters.sector.length > 0 && !filters.sector.includes(stock.sector)) return false;
    
    // Revenue Growth filter
    if (filters.revenueGrowth?.min && stock.revenueGrowth < filters.revenueGrowth.min) return false;
    
    // Profit Margin filter
    if (filters.profitMargin?.min && stock.profitMargin < filters.profitMargin.min) return false;
    
    // Dividend Yield filter
    if (filters.dividendYield?.min && stock.dividendYield < filters.dividendYield.min) return false;
    
    // Debt to Equity filter
    if (filters.debtToEquity?.max && stock.debtToEquity > filters.debtToEquity.max) return false;
    
    // ROA filter
    if (filters.roa?.min && stock.roa < filters.roa.min) return false;
    
    // ROE filter
    if (filters.roe?.min && stock.roe < filters.roe.min) return false;
    
    return true;
  });
}

export function getSectors(): string[] {
  return Array.from(new Set(mockStockData.map(stock => stock.sector))).sort();
}

export async function getStockData(symbol: string): Promise<StockData | null> {
  // In production, this would fetch real-time data from a financial API
  const stock = mockStockData.find(s => s.symbol === symbol);
  return stock || null;
}

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value.toFixed(2)}`;
}

export function formatMarketCap(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}T`;
  } else if (value >= 1) {
    return `$${value.toFixed(1)}B`;
  } else {
    return `$${(value * 1000).toFixed(0)}M`;
  }
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}