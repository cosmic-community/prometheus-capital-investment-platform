// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Investment Research
export interface InvestmentResearch extends CosmicObject {
  type: 'investment-research';
  metadata: {
    report_title?: string;
    company_sector?: string;
    investment_thesis?: string;
    risk_assessment?: string;
    research_type?: {
      key: 'initial' | 'followup' | 'quarterly' | 'exit';
      value: string;
    };
    investment_category?: {
      key: 'public_equity' | 'private_equity' | 'fixed_income';
      value: string;
    };
    research_documents?: any[];
    confidential?: boolean;
  };
}

// Portfolio Companies
export interface PortfolioCompany extends CosmicObject {
  type: 'portfolio-companies';
  metadata: {
    company_name?: string;
    ticker_symbol?: string;
    industry_sector?: string;
    investment_type?: {
      key: 'public' | 'private';
      value: string;
    };
    investment_date?: string;
    initial_investment?: string;
    current_status?: {
      key: 'active' | 'monitoring' | 'exited';
      value: string;
    };
    company_description?: string;
    key_metrics?: {
      market_cap?: string;
      pe_ratio?: number;
      revenue_growth?: string;
      profit_margin?: string;
      dividend_yield?: string;
      [key: string]: any;
    };
  };
}

// Team Members
export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    full_name?: string;
    position_title?: string;
    professional_bio?: string;
    years_experience?: number;
    education?: string;
    specializations?: string[];
    headshot?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Market Insights
export interface MarketInsight extends CosmicObject {
  type: 'market-insights';
  metadata: {
    insight_title?: string;
    content?: string;
    market_category?: {
      key: 'equity_markets' | 'economic_outlook' | 'sector_analysis' | 'investment_strategy';
      value: string;
    };
    publication_date?: string;
    author?: TeamMember;
    featured_chart?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Performance Reports
export interface PerformanceReport extends CosmicObject {
  type: 'performance-reports';
  metadata: {
    report_period?: string;
    report_type?: {
      key: 'quarterly' | 'annual' | 'monthly';
      value: string;
    };
    executive_summary?: string;
    performance_metrics?: {
      quarterly_return?: string;
      ytd_return?: string;
      benchmark_outperformance?: string;
      sharpe_ratio?: number;
      max_drawdown?: string;
      portfolio_turnover?: string;
      [key: string]: any;
    };
    report_documents?: any[];
    report_date?: string;
  };
}

// Stock Screener Types
export interface StockScreenerFilters {
  marketCap?: {
    min?: number;
    max?: number;
  };
  peRatio?: {
    min?: number;
    max?: number;
  };
  sector?: string[];
  revenueGrowth?: {
    min?: number;
  };
  profitMargin?: {
    min?: number;
  };
  dividendYield?: {
    min?: number;
  };
  debtToEquity?: {
    max?: number;
  };
  roa?: {
    min?: number;
  };
  roe?: {
    min?: number;
  };
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  peRatio: number;
  sector: string;
  industry: string;
  revenueGrowth: number;
  profitMargin: number;
  dividendYield: number;
  debtToEquity: number;
  roa: number;
  roe: number;
  aiScore?: number;
  aiAnalysis?: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isInvestmentResearch(obj: CosmicObject): obj is InvestmentResearch {
  return obj.type === 'investment-research';
}

export function isPortfolioCompany(obj: CosmicObject): obj is PortfolioCompany {
  return obj.type === 'portfolio-companies';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team-members';
}

export function isMarketInsight(obj: CosmicObject): obj is MarketInsight {
  return obj.type === 'market-insights';
}

export function isPerformanceReport(obj: CosmicObject): obj is PerformanceReport {
  return obj.type === 'performance-reports';
}