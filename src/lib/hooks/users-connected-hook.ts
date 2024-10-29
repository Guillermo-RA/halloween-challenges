import { getAvatar } from '@/lib/helpers'
import { socket } from '@/lib/utils/socket'
import type { User } from '@/lib/types/User'
import { useEffect, useState } from 'react'

const DUMMY_USERS: User[] = [
  { id: '1', name: 'Migue' },
  { id: '2', name: 'Guille' },
  { id: '3', name: 'Elena' },
  { id: '4', name: 'Alicia' },
  { id: '5', name: 'Pablo' },
  { id: '6', name: 'Yisus' }
]

export function useUsersConnected () {
  const [users, setUsers] = useState<User[]>(() => getUsers())

  useEffect(() => {
    socket.connect()
    socket
      .on('create-user', (user: User) => {
        setUsers(prevUsers => [...prevUsers, parseUser(user)])
      })
      .on('update-user', (updatedUser: User) => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === updatedUser.id ? parseUser(updatedUser) : user
          )
        )
      })
      .on('delete-user', (id: string) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
      })
      .on('clear-users', () => {
        setUsers([])
      })
      .on('user-ready', (id: string) => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === id ? { ...user, ready: true } : user
          )
        )
      })
      .on('user-not-ready', (id: string) => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === id ? { ...user, ready: false } : user
          )
        )
      })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(users))
  }, [users])

  return { users, setUsers }
}

function getUsers (): User[] {
  return localStorage.getItem('players')
    ? JSON.parse(localStorage.getItem('players') as string)
    : []

  // return DUMMY_USERS.map(parseUser);
}

function parseUser (user: User): User {
  const avatar = user.avatar ?? getAvatar(user)

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    avatar,
    ready: false,
    primary_mission: {
      type: 'say',
      target: 'Pablo',
      action: 'papanatas'
    },
    secondary_missions: user.secondary_missions
  }
}
