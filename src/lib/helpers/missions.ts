import type { PrimaryMission } from '@/lib/types/Missions'
import type { User } from '@/lib/types/User'

const PRIMARY_MISSION_SHORT_TEXT = 'Haz que {{target}} {{type}} {{action}}'

export function getPrimaryMissionMessage (
  player: User | null
): { shortText: string; description: string } | null {
  if (!player?.primary_mission) return null

  const mission = player.primary_mission as PrimaryMission

  const missionMessage = PRIMARY_MISSION_SHORT_TEXT.replace(
    '{{target}}',
    mission.target.name
  )
    .replace('{{type}}', mission.type === 'say' ? 'diga' : '')
    .replace('{{action}}', mission.action)

  return {
    shortText: missionMessage,
    description: getDescription(mission)
  }
}

export function getSecondaryMissions (player: User | null): string[] {
  return player?.secondary_missions || []
}

function getDescription (mission: PrimaryMission): string {
  const message =
    'Tu misión consiste en hacer que {{target}} {{type}} {{action}} antes de que sean las 2:30. Si lo consigues, recibirás 3 puntos.'

  return message
    .replace('{{target}}', mission.target.name)
    .replace('{{type}}', mission.type === 'say' ? 'diga' : '')
    .replace('{{action}}', mission.action)
}
