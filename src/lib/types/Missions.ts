export type PrimaryMission = {
  type: 'say' | 'do'
  target: {
    id: string
    name: string
  }
  action: string
}
