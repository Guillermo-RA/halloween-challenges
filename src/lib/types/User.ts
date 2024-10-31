import type { PrimaryMission, SecondaryMission } from '@/lib/types/Missions'

export type User = {
  id: string
  name: string
  ready?: boolean
  username?: string
  avatar?: string
  primary_mission?: PrimaryMission
  secondary_missions?: SecondaryMission[]
}
