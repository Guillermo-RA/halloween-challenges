import { PrimaryMissionCard } from '@/components/guest/game-section/game-diary/missions/primary-mission/mission-card'
import { SecondaryMissions } from '@/components/guest/game-section/game-diary/missions/secondary-missions'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getPrimaryMissionMessage, getSecondaryMissions } from '@/lib/helpers/missions'
import { NotepadText, Shield } from 'lucide-react'
import type React from 'react'

export function MissionsSections() {
    const player = localStorage?.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : null

    const primaryMission = getPrimaryMissionMessage(player)
    const secondaryMissions = getSecondaryMissions(player)

    return (
        <div className='flex flex-col gap-6'>
            <Section type='principal' icon={Shield}>
                {primaryMission
                    ? <PrimaryMissionCard mission={primaryMission} />
                    : (
                        <p className='text-foreground text-lg'>
                            No tienes ninguna misión asignada
                        </p>
                    )}
            </Section>
            <Section type='secundarias' icon={NotepadText}>
                {secondaryMissions.length
                    ? <SecondaryMissions secondaryMissions={secondaryMissions} />
                    : (
                        <p className='text-foreground text-lg'>
                            No tienes ninguna misión secundaria asignada
                        </p>
                    )}
            </Section>
        </div>
    )
}
function Section({ type, icon: Icon, children }: { type: string, icon: React.ElementType, children: React.ReactNode }) {
    const missionPrefix = type === 'principal' ? 'Misión' : 'Misiones'

    return (
        <section className='flex flex-col gap-6'>
            <Accordion type="single" collapsible defaultValue={`principal_mission`}>
                <AccordionItem value={`${type}_mission`}>
                    <AccordionTrigger className='no-underline hover:no-underline'>
                        <h2 className='flex gap-3 items-center text-foreground font-bold text-3xl'>
                            <Icon className='w-7 h-7' />
                            <span>{missionPrefix} {type}</span>
                        </h2>
                    </AccordionTrigger>
                    <AccordionContent>

                        <div className='flex flex-col gap-6'>
                            {children}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section >
    )
}
