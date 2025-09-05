import ResearchGrid from '@/components/ResearchGrid'
import { getInvestmentResearch } from '@/lib/cosmic'

export const metadata = {
  title: 'Investment Research - Prometheus Capital',
  description: 'In-depth investment research and analysis reports',
}

export default async function ResearchPage() {
  const research = await getInvestmentResearch()

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Investment Research
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Comprehensive analysis and research reports on investment opportunities, 
            market trends, and strategic insights.
          </p>
        </div>
        <ResearchGrid research={research} />
      </div>
    </div>
  )
}