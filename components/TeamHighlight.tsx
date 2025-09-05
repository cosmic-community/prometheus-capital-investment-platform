import Link from 'next/link'
import { ArrowRight, Award, Users } from 'lucide-react'
import { TeamMember } from '@/types'

interface TeamHighlightProps {
  team: TeamMember[]
}

export default function TeamHighlight({ team }: TeamHighlightProps) {
  const featuredMembers = team.slice(0, 2)

  return (
    <section className="py-16 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              Led by Investment Experts
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              Our team combines decades of investment experience with innovative approaches 
              to identifying and managing long-term value opportunities across global markets.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-sm text-secondary-600">Years Combined Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">$2B+</div>
                <div className="text-sm text-secondary-600">Assets Under Management</div>
              </div>
            </div>

            <Link href="/team" className="btn-primary inline-flex items-center">
              Meet Our Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Right Side - Team Members */}
          <div className="space-y-6">
            {featuredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  {member.metadata?.headshot ? (
                    <img 
                      src={`${member.metadata.headshot.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={member.metadata?.full_name || member.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary-600" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-1">
                      {member.metadata?.full_name || member.title}
                    </h3>
                    <p className="text-primary-600 font-medium mb-2">
                      {member.metadata?.position_title}
                    </p>
                    <p className="text-sm text-secondary-600 mb-3">
                      {member.metadata?.years_experience} years of experience
                    </p>
                    
                    {member.metadata?.specializations && member.metadata.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {member.metadata.specializations.slice(0, 2).map((spec, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}