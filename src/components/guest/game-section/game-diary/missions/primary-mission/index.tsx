import { MissionCard } from '@/components/guest/game-section/game-diary/missions/primary-mission/mission-card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getPrimaryMissionMessage } from '@/lib/helpers/missions'
import { cn } from '@/lib/utils'
import { Shield } from 'lucide-react'
import { useState } from 'react'

export function PrimaryMission() {
    const player = localStorage?.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : null

    const primaryMission = getPrimaryMissionMessage(player)

    if (!primaryMission) {
        return (
            <Section>
                <p className='text-foreground text-lg'>
                    No tienes ninguna misión asignada
                </p>
            </Section>
        )
    }

    return (
        <Section>
            <MissionCard mission={primaryMission} />
        </Section>
    )
}
function Section({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false)

    const toggleCollapse = () => setCollapsed(!collapsed)

    return (
        <section className='flex flex-col gap-6'>
            <Accordion type="single" collapsible defaultValue='primary_mission' >
                <AccordionItem value="primary_mission">
                    <AccordionTrigger className='no-underline hover:no-underline'>
                        <h2 className='flex gap-3 items-center text-foreground font-bold text-3xl'>
                            <Shield className='w-7 h-7' />
                            <span>Misión principal</span>
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
