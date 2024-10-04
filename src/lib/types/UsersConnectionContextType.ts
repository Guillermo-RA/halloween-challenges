import type { User } from '@/lib/types/User';

export type UserConnectionContextType = {
    users: User[];
}

export type UserConntectionDispatchContext = {
    handleEditUser: (id: number, username: string) => void;
    handleDeleteUser: (id: number) => void;
}