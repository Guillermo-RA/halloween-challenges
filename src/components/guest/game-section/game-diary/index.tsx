import { PrimaryMission } from '@/components/guest/game-section/game-diary/missions/primary-mission'

export function GameDiary() {
  return (
    <section className='flex flex-col gap-3'>
      <PrimaryMission />
      {/* <SecondaryMissions /> */}
    </section>
  )
}
