import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, BarChart3, Shield } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Long-Term Value
            <br />
            <span className="text-primary-200">Investment Excellence</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-slide-up">
            Prometheus Capital combines decades of investment expertise with cutting-edge AI analysis 
            to identify exceptional long-term value opportunities in public and private markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <Link href="/research" className="inline-flex items-center btn-primary">
              View Our Research
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/screener" className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200">
              Try Stock Screener
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <TrendingUp className="h-12 w-12 text-primary-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-primary-100 text-sm">
              Advanced AI models screen thousands of companies for value opportunities
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <Users className="h-12 w-12 text-primary-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
            <p className="text-primary-100 text-sm">
              Experienced investment professionals with decades of market expertise
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <BarChart3 className="h-12 w-12 text-primary-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Proven Performance</h3>
            <p className="text-primary-100 text-sm">
              Consistent outperformance through disciplined value investing principles
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <Shield className="h-12 w-12 text-primary-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
            <p className="text-primary-100 text-sm">
              Comprehensive risk assessment and portfolio management strategies
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}