import { Checkbox } from '@/components/ui/checkbox';
import { isMidnight } from '@/lib/constants/common';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function PrimaryMissionCard({ mission }: { mission: { shortText: string; description: string } }) {

    const defaultChecked = getIsChecked()

    return (
        <div className='flex items-center gap-6 px-4'>
            <PrimaryMissionCheckbox name='primary' />
            <label htmlFor='primary' className={cn('flex flex-col gap-3 cursor-pointer', { 'cursor-auto': defaultChecked })}>
                <div className='flex items-center gap-3'>
                    <h3 className='text-foreground font-medium text-2xl'>
                        {mission.shortText}
                    </h3>
                </div>
                <p className='text-foreground text-lg'>
                    {mission.description}
                </p>
            </label>
        </div>
    )
}

function PrimaryMissionCheckbox({ name }: { name: string }) {

    const [isChecked, setIsChecked] = useState(getIsChecked)

    const handleCheckboxChange = async () => {
        if (isChecked) return

        const response = confirm('¿Estás seguro de que quieres marcar esta misión como completada? No podrás deshacer esta acción.')

        if (!response) return

        setIsChecked(true)
        localStorage.setItem('primary_mission', 'completed')
    }

    return (
        <Checkbox
            id={name}
            name={name}
            onCheckedChange={handleCheckboxChange}
            checked={isChecked}
            className='rounded-full w-20 h-20 data-[state=checked]:animate-checked'
            checkClassName='w-20 h-20'
            disabled={isChecked || isMidnight}
        />
    )
}

function getIsChecked() {
    return localStorage.getItem('primary_mission') === 'completed'
}
