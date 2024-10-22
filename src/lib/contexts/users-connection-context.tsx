import { useUsersConnected } from '@/lib/hooks/users-connected-hook'
import {
  type UserConnectionContextType,
  type UserConntectionDispatchContext
} from '@/lib/types/UsersConnectionContextType'
import { socket } from '@/lib/utils/socket'
import { createContext, useContext } from 'react'

const UsersConnectionContext = createContext<UserConnectionContextType | null>(
  null
)

const UsersConnectionDispatchContext =
  createContext<UserConntectionDispatchContext | null>(null)

export function UsersConnectionProvider ({
  children
}: {
  children: React.ReactNode
}) {
  const { users, setUsers } = useUsersConnected()

  const handleEditUser = (
    id: string,
    userData: {
      username?: string
      ready?: boolean
    }
  ) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === id ? { ...user, ...userData } : user))
    )

    socket.emit('edit-user', { id, ...userData })
  }

  const handleDeleteUser = (id: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id))

    socket.emit('delete-user', id)
  }

  const handleSetAllUsersToNotReady = () => {
    setUsers(prevUsers => prevUsers.map(user => ({ ...user, ready: false })))

    socket.emit('clear-ready')
  }

  return (
    <UsersConnectionContext.Provider value={{ users }}>
      <UsersConnectionDispatchContext.Provider
        value={{
          handleEditUser,
          handleDeleteUser,
          handleSetAllUsersToNotReady
        }}
      >
        {children}
      </UsersConnectionDispatchContext.Provider>
    </UsersConnectionContext.Provider>
  )
}

export function useUsersConnection () {
  const currentUserContext = useContext(UsersConnectionContext)

  if (!currentUserContext) {
    throw new Error(
      'useUsersConnection must be used within a UsersConnectionProvider'
    )
  }

  return currentUserContext
}

export function useUsersConnectionDispatch () {
  const currentUserDispatchContext = useContext(UsersConnectionDispatchContext)

  if (!currentUserDispatchContext) {
    throw new Error(
      'useUsersConnectionDispatch must be used within a UsersConnectionProvider'
    )
  }

  return currentUserDispatchContext
}
