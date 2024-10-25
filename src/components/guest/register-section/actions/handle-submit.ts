import { REGISTER } from '@/lib/constants/api-routes'
import type { RegisterResponse } from '@/lib/types/RegisterResponse'
import { fetcher } from '@/lib/utils/fetch'
import { navigate } from 'astro/virtual-modules/transitions-router.js'

export async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries()) ?? {}


    if (data.name === '') throw new Error('El nombre es obligatorio')

    const response = (await fetcher(REGISTER, data, {
        method: 'POST'
    })) as RegisterResponse

    localStorage.setItem('user', JSON.stringify(response.data))
    navigate('/waiting')
}