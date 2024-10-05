import { getAvatar } from '@/lib/helpers';
import { socket } from '@/lib/utils/socket';
import type { User } from '@/lib/types/User';
import { useEffect, useState } from 'react';


const DUMMY_USERS: User[] = [
    { id: 1, name: 'Migue'},
    { id: 2, name: 'Guille'},
    { id: 3, name: 'Elena'}, 
    { id: 4, name: 'Alicia'},
    { id: 5, name: 'Pablo'}, 
    { id: 6, name: 'Yisus'}, 
];


export function useUsersConnected() {
    const [users, setUsers] = useState<User[]>(() => DUMMY_USERS.map(parseUser));
    
    useEffect(() => {
        socket.connect();
        socket.on('users', (users: User[]) => {
        setUsers(users.map(parseUser));
        });
    
        return () => {
        socket.disconnect();
        };
    }, []);
    
    return { users, setUsers };
}

function parseUser(user: User): User {
  const avatar = getAvatar(user);

    return {
        id: user.id,
        name: user.name,
        username: user.username,
        avatar,
        ready: Math.random() > 0.5,
    };
}
