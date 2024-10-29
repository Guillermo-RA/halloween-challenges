import type { PrimaryMission } from '@/lib/types/Missions'
import type { User } from '@/lib/types/User'

const PRIMARY_MISSION_SHORT_TEXT = 'Haz que {{target}} {{type}} {{action}}'

export function getPrimaryMissionMessage(player: User | null): { shortText: string; description: string } | null {
    if (!player?.primary_mission) return null

    const mission = player.primary_mission as PrimaryMission

    const missionMessage = PRIMARY_MISSION_SHORT_TEXT
        .replace('{{target}}', mission.target)
        .replace('{{type}}', mission.type === 'say' ? 'diga' : 'haga')
        .replace('{{action}}', mission.action)

    return {
        shortText: missionMessage,
        description: getDescription(mission)
    }
}

function getDescription(mission: PrimaryMission): string {

    const message = 'Tu misión consiste en hacer que {{target}} {{type}} {{action}} antes de que sean las 0:00. Si lo consigues, recibirás 3 puntos. Si no, perderás 1 punto.'

    return message
        .replace('{{target}}', mission.target)
        .replace('{{type}}', mission.type === 'say' ? 'diga' : 'haga')
        .replace('{{action}}', mission.action)


}