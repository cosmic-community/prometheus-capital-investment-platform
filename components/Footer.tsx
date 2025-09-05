import Link from 'next/link'
import { TrendingUp, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Prometheus Capital</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              Focused on long-term value investment in public and private companies, 
              combining traditional analysis with AI-powered insights.
            </p>
            <div className="space-y-2 text-secondary-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@prometheuscapital.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Market Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/screener" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Stock Screener
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400">
          <p>&copy; 2024 Prometheus Capital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}