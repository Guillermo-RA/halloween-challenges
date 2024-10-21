import type { User } from '@/lib/types/User';

export type UserConnectionContextType = {
    users: User[];
}

export type UserConntectionDispatchContext = {
    handleEditUser: (id: number, userData: { username?: string; ready?: boolean; }) => void;
    handleDeleteUser: (id: number) => void;
    handleSetAllUsersToNotReady: () => void;
}