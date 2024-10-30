import { Checkbox } from '@/components/ui/checkbox';
import { isMidnight } from '@/lib/constants/common';
import { useState } from 'react';

export function SecondaryMissions({ secondaryMissions }: { secondaryMissions: string[] }) {
    return (
        <article className='flex flex-col gap-6'>
            {secondaryMissions.map((mission, index) => (
                <SecondaryMissionCard key={index} mission={mission} missionIndex={index} />
            ))}
        </article>
    )
}

function SecondaryMissionCard({ mission, missionIndex }: { mission: string, missionIndex: number }) {
    return (
        <div className='flex items-center gap-6 px-4'>
            <SecondaryMissionCheckbox name={`secondary-${missionIndex}`} />
            <label htmlFor={`secondary-${missionIndex}`} className='flex flex-col gap-3 cursor-pointer text-foreground font-medium text-lg'>
                {mission}
            </label>
        </div>
    )
}

function SecondaryMissionCheckbox({ name }: { name: string }) {

    const [isChecked, setIsChecked] = useState(() => getIsChecked(name))

    const handleCheckboxChange = async (value: boolean) => {
        setIsChecked(value)
        localStorage.setItem(`secondary_${name}`, value ? 'completed' : 'incompleted')
    }

    return (
        <Checkbox
            id={name}
            name={name}
            onCheckedChange={handleCheckboxChange}
            checked={isChecked}
            className='rounded-full w-6 h-6 data-[state=checked]:animate-checked'
            checkClassName='w-6 h-6'
            disabled={isMidnight}
        />
    )
}

function getIsChecked(name: string) {
    return localStorage.getItem(`secondary_${name}`) === 'completed'
}