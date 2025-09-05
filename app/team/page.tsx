import TeamGrid from '@/components/TeamGrid'
import { getTeamMembers } from '@/lib/cosmic'

export const metadata = {
  title: 'Our Team - Prometheus Capital',
  description: 'Meet the experienced investment professionals at Prometheus Capital',
}

export default async function TeamPage() {
  const team = await getTeamMembers()

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Our Team
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Our experienced investment professionals bring decades of expertise in 
            identifying and managing long-term value investments.
          </p>
        </div>
        <TeamGrid team={team} />
      </div>
    </div>
  )
}