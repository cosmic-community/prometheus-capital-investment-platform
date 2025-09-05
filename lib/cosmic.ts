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
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch investment research:', error);
    return [];
  }
}

// Portfolio Companies functions
export async function getPortfolioCompanies() {
  try {
    const response = await cosmic.objects
      .find({ type: 'portfolio-companies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch portfolio companies:', error);
    return [];
  }
}

// Team Members functions
export async function getTeamMembers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch team members:', error);
    return [];
  }
}

// Market Insights functions
export async function getMarketInsights() {
  try {
    const response = await cosmic.objects
      .find({ type: 'market-insights' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch market insights:', error);
    return [];
  }
}

// Performance Reports functions
export async function getPerformanceReports() {
  try {
    const response = await cosmic.objects
      .find({ type: 'performance-reports' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch performance reports:', error);
    return [];
  }
}