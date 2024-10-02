import type { User } from '@/lib/types/User';
import { useState } from 'react';

const DUMMY_USERS: User[] = [
    { id: 1, name: 'Migue', gender: 'boy' },
    { id: 2, name: 'Guille', gender: 'boy' },
    { id: 3, name: 'Elena', gender: 'girl' },  
    { id: 4, name: 'Alicia', gender: 'girl' },
    { id: 5, name: 'Pablo', gender: 'boy' },
    { id: 5, name: 'Pablo', gender: 'boy' },
    { id: 5, name: 'Pablo', gender: 'boy' },
    { id: 5, name: 'Pablo', gender: 'boy' },
    { id: 5, name: 'Pablo', gender: 'boy' },
    { id: 5, name: 'Pablo', gender: 'boy' },
    { id: 5, name: 'Pablo', gender: 'boy' },
    { id: 5, name: 'Pablo', gender: 'boy' },
];

export function useUsersConnected() {
    const [users, setUsers] = useState<User[]>(() => DUMMY_USERS.map(parseUser));
    
    // useEffect(() => {
    //     const socket = io('http://localhost:3001');
    //     socket.on('users', (users: User[]) => {
    //     setUsers(users.map(parseUser));
    //     });
    
    //     return () => {
    //     socket.disconnect();
    //     };
    // }, []);
    
    return { users, setUsers };
}

function parseUser(user: User): User {
  const avatar = `https://avatar.iran.liara.run/public/${user.gender}?username=${user.name}`;

    return {
        id: user.id,
        name: user.name,
        avatar,
    };
}
