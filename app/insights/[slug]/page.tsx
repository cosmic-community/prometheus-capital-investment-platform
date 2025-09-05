// app/insights/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { cosmic } from '@/lib/cosmic'
import { MarketInsight } from '@/types'

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

async function getMarketInsight(slug: string): Promise<MarketInsight | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'market-insights', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as MarketInsight;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const insight = await getMarketInsight(slug)

  if (!insight) {
    return {
      title: 'Market Insight Not Found - Prometheus Capital',
    }
  }

  return {
    title: `${insight.metadata?.insight_title || insight.title} - Prometheus Capital`,
    description: insight.metadata?.content 
      ? insight.metadata.content.substring(0, 160).replace(/<[^>]*>/g, '') + '...'
      : 'Market insight and analysis from Prometheus Capital',
  }
}

export default async function MarketInsightPage({ params }: PageProps) {
  const { slug } = await params
  const insight = await getMarketInsight(slug)

  if (!insight) {
    notFound()
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Back button */}
        <Link 
          href="/insights"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Market Insights
        </Link>

        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center text-sm text-secondary-500 space-x-4 mb-4">
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

            <h1 className="text-4xl font-bold text-secondary-900 mb-4">
              {insight.metadata?.insight_title || insight.title}
            </h1>

            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                {insight.metadata?.market_category?.value || 'Market Analysis'}
              </span>
            </div>
          </div>

          {/* Featured chart */}
          {insight.metadata?.featured_chart && (
            <div className="mb-8">
              <img 
                src={`${insight.metadata.featured_chart.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt="Market analysis chart"
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg prose-secondary max-w-none">
            {insight.metadata?.content ? (
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: insight.metadata.content 
                }} 
              />
            ) : (
              <p className="text-secondary-600 text-lg leading-relaxed">
                This market insight is currently being updated. Please check back soon for the complete analysis.
              </p>
            )}
          </div>

          {/* Author info */}
          {insight.metadata?.author && (
            <div className="mt-12 pt-8 border-t border-secondary-200">
              <div className="flex items-center space-x-4">
                {insight.metadata.author.metadata?.headshot && (
                  <img 
                    src={`${insight.metadata.author.metadata.headshot.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={insight.metadata.author.metadata.full_name || insight.metadata.author.title}
                    width={80}
                    height={80}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {insight.metadata.author.metadata?.full_name || insight.metadata.author.title}
                  </h3>
                  {insight.metadata.author.metadata?.position_title && (
                    <p className="text-secondary-600">
                      {insight.metadata.author.metadata.position_title}
                    </p>
                  )}
                  {insight.metadata.author.metadata?.professional_bio && (
                    <p className="text-sm text-secondary-600 mt-2 max-w-2xl">
                      {insight.metadata.author.metadata.professional_bio.substring(0, 200)}...
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Related insights CTA */}
          <div className="mt-12 pt-8 border-t border-secondary-200 text-center">
            <Link 
              href="/insights"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              View More Market Insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}