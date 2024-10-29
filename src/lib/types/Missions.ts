export type PrimaryMission = {
  type: 'say' | 'do'
  target: string
  action: string
}

export type SecondaryMission = {
  description: string
}
