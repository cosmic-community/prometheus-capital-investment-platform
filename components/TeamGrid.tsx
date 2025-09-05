import { Users, Award, GraduationCap } from 'lucide-react'
import { TeamMember } from '@/types'

interface TeamGridProps {
  team: TeamMember[]
}

export default function TeamGrid({ team }: TeamGridProps) {
  if (!team || team.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">No Team Members</h3>
        <p className="text-secondary-600">Team member profiles will appear here when available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map((member) => (
        <article key={member.id} className="card p-6 text-center">
          <div className="mb-6">
            {member.metadata?.headshot ? (
              <img 
                src={`${member.metadata.headshot.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={member.metadata?.full_name || member.title}
                width={120}
                height={120}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
            ) : (
              <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-16 w-16 text-primary-600" />
              </div>
            )}
            
            <h3 className="text-xl font-bold text-secondary-900 mb-1">
              {member.metadata?.full_name || member.title}
            </h3>
            
            <p className="text-primary-600 font-medium mb-2">
              {member.metadata?.position_title}
            </p>
            
            {member.metadata?.years_experience && (
              <p className="text-sm text-secondary-600 flex items-center justify-center">
                <Award className="h-4 w-4 mr-1" />
                {member.metadata.years_experience} years of experience
              </p>
            )}
          </div>

          <div className="space-y-4 text-left">
            {member.metadata?.professional_bio && (
              <div className="text-secondary-600">
                <div 
                  className="prose prose-sm"
                  dangerouslySetInnerHTML={{ 
                    __html: member.metadata.professional_bio.substring(0, 300) + '...' 
                  }} 
                />
              </div>
            )}

            {member.metadata?.education && (
              <div>
                <div className="flex items-center text-sm text-secondary-500 mb-2">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  <span>Education</span>
                </div>
                <div className="text-sm text-secondary-700 whitespace-pre-line">
                  {member.metadata.education}
                </div>
              </div>
            )}

            {member.metadata?.specializations && member.metadata.specializations.length > 0 && (
              <div>
                <div className="text-sm text-secondary-500 mb-2">Specializations</div>
                <div className="flex flex-wrap gap-2">
                  {member.metadata.specializations.map((spec, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}