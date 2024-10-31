import { USER } from '@/lib/constants/api-routes'
import type { RegisterResponse } from '@/lib/types/RegisterResponse'
import { fetcher } from '@/lib/utils/fetch'
import { navigate } from 'astro/virtual-modules/transitions-router.js'

export async function handleEdit (id: string, name: string) {
  const response = (await fetcher(
    USER,
    { id, name },
    {
      method: 'PUT'
    }
  )) as RegisterResponse

  localStorage.setItem('user', JSON.stringify(response.data))
  navigate('/waiting')
}
