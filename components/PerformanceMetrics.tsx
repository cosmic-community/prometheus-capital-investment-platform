'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Award, Target } from 'lucide-react'
import { PerformanceReport } from '@/types'

interface PerformanceMetricsProps {
  reports: PerformanceReport[]
}

export default function PerformanceMetrics({ reports }: PerformanceMetricsProps) {
  const latestReport = reports && reports.length > 0 ? reports[0] : null

  const chartData = [
    {
      name: 'Q1 2024',
      'Prometheus Capital': 8.5,
      'S&P 500': 6.2,
    },
    {
      name: 'Q2 2024',
      'Prometheus Capital': 11.2,
      'S&P 500': 7.8,
    },
    {
      name: 'Q3 2024',
      'Prometheus Capital': 12.3,
      'S&P 500': 8.7,
    },
  ]

  const metrics = latestReport?.metadata?.performance_metrics || {}

  return (
    <section className="py-16 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Performance Overview
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Consistent outperformance through disciplined value investing and AI-enhanced analysis
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {metrics.quarterly_return || '12.3%'}
            </div>
            <div className="text-sm text-secondary-600">Quarterly Return</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="flex items-center justify-center mb-3">
              <Award className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-primary-600 mb-1">
              {metrics.ytd_return || '28.7%'}
            </div>
            <div className="text-sm text-secondary-600">Year-to-Date</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="flex items-center justify-center mb-3">
              <Target className="h-8 w-8 text-accent-600" />
            </div>
            <div className="text-3xl font-bold text-accent-600 mb-1">
              {metrics.benchmark_outperformance || '+3.6%'}
            </div>
            <div className="text-sm text-secondary-600">vs Benchmark</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-500 mb-1">
              {metrics.max_drawdown || '-4.2%'}
            </div>
            <div className="text-sm text-secondary-600">Max Drawdown</div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-secondary-900 mb-6">
            Quarterly Performance Comparison
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                <Bar dataKey="Prometheus Capital" fill="#0ea5e9" />
                <Bar dataKey="S&P 500" fill="#94a3b8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}