import { useUsersConnected } from '@/lib/hooks/users-connected-hook'
import {
  type UserConnectionContextType,
} from '@/lib/types/UsersConnectionContextType'
import { socket } from '@/lib/utils/socket'
import { createContext, useContext } from 'react'

const UsersConnectionContext = createContext<UserConnectionContextType | null>(
  null
)


export function UsersConnectionProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { users } = useUsersConnected()

  return (
    <UsersConnectionContext.Provider value={{ users }}>
      {children}
    </UsersConnectionContext.Provider>
  )
}

export function useUsersConnection() {
  const currentUserContext = useContext(UsersConnectionContext)

  if (!currentUserContext) {
    throw new Error(
      'useUsersConnection must be used within a UsersConnectionProvider'
    )
  }

  return currentUserContext
}

