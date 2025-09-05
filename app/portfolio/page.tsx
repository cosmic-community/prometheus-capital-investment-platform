import PortfolioGrid from '@/components/PortfolioGrid'
import { getPortfolioCompanies } from '@/lib/cosmic'

export const metadata = {
  title: 'Portfolio - Prometheus Capital',
  description: 'Our portfolio of public and private company investments',
}

export default async function PortfolioPage() {
  const companies = await getPortfolioCompanies()

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            A curated selection of public and private companies that align with our 
            long-term value investment philosophy.
          </p>
        </div>
        <PortfolioGrid companies={companies} />
      </div>
    </div>
  )
}