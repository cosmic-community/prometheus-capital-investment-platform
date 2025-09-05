import Hero from '@/components/Hero'
import PerformanceMetrics from '@/components/PerformanceMetrics'
import LatestInsights from '@/components/LatestInsights'
import TeamHighlight from '@/components/TeamHighlight'
import { getMarketInsights, getPerformanceReports, getTeamMembers } from '@/lib/cosmic'

export default async function HomePage() {
  const [insights, reports, team] = await Promise.all([
    getMarketInsights(),
    getPerformanceReports(),
    getTeamMembers()
  ])

  return (
    <div className="space-y-16">
      <Hero />
      <PerformanceMetrics reports={reports} />
      <LatestInsights insights={insights} />
      <TeamHighlight team={team} />
    </div>
  )
}