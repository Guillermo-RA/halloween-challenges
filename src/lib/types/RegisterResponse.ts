import type { User } from '@/lib/types/User';

export type RegisterResponse = {
    message: string;
    data: User;
}