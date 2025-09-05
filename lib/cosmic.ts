import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Investment Research functions
export async function getInvestmentResearch() {
  try {
    const response = await cosmic.objects
      .find({ type: 'investment-research' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch investment research');
  }
}

// Portfolio Companies functions
export async function getPortfolioCompanies() {
  try {
    const response = await cosmic.objects
      .find({ type: 'portfolio-companies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch portfolio companies');
  }
}

// Team Members functions
export async function getTeamMembers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch team members');
  }
}

// Market Insights functions
export async function getMarketInsights() {
  try {
    const response = await cosmic.objects
      .find({ type: 'market-insights' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch market insights');
  }
}

// Performance Reports functions
export async function getPerformanceReports() {
  try {
    const response = await cosmic.objects
      .find({ type: 'performance-reports' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch performance reports');
  }
}

// AI Stock Analysis function
export async function analyzeStockWithAI(stockData: any, investmentCriteria: string) {
  try {
    const prompt = `
      Analyze this stock for long-term value investment potential based on the following criteria: ${investmentCriteria}
      
      Stock Data:
      - Symbol: ${stockData.symbol}
      - Company: ${stockData.name}
      - Sector: ${stockData.sector}
      - Market Cap: ${stockData.marketCap}
      - P/E Ratio: ${stockData.peRatio}
      - Revenue Growth: ${stockData.revenueGrowth}%
      - Profit Margin: ${stockData.profitMargin}%
      - Dividend Yield: ${stockData.dividendYield}%
      - Debt to Equity: ${stockData.debtToEquity}
      - ROA: ${stockData.roa}%
      - ROE: ${stockData.roe}%
      
      Please provide:
      1. Investment Score (1-100)
      2. Key strengths and weaknesses
      3. Risk assessment
      4. Recommendation (Buy/Hold/Pass)
      5. Brief rationale
    `;

    const analysis = await cosmic.ai.generateText({
      prompt,
      max_tokens: 800
    });

    return analysis.text;
  } catch (error) {
    console.error('AI analysis failed:', error);
    return 'AI analysis temporarily unavailable';
  }
}

// Bulk stock analysis for screener
export async function bulkAnalyzeStocks(stocks: any[], criteria: string) {
  try {
    const stockSummaries = stocks.map(stock => 
      `${stock.symbol}: Market Cap $${stock.marketCap}B, P/E ${stock.peRatio}, Growth ${stock.revenueGrowth}%`
    ).join('\n');

    const prompt = `
      Score these stocks (1-100) for long-term value investment based on: ${criteria}
      
      Stocks to analyze:
      ${stockSummaries}
      
      Return scores in format: SYMBOL:SCORE (one per line)
      Then provide a brief market overview.
    `;

    const analysis = await cosmic.ai.generateText({
      prompt,
      max_tokens: 1000
    });

    return analysis.text;
  } catch (error) {
    console.error('Bulk AI analysis failed:', error);
    return '';
  }
}