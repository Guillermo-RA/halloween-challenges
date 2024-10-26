import type { User } from '@/lib/types/User';

export type UserConnectionContextType = {
    users: User[];
}

export type UserConntectionDispatchContext = {
    handleEditUser: (id: string, userData: { username?: string; ready?: boolean; }) => void;
    handleDeleteUser: (id: string) => void;
    handleSetAllUsersToNotReady: () => void;
}