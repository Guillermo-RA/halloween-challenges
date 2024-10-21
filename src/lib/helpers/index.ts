import type { User } from '@/lib/types/User';
const DEFAULT_AVATAR_URL = 'https://avatar.iran.liara.run/public?username={{name}}';

export function getAvatar(user: User): string {
    return DEFAULT_AVATAR_URL.replace('{{name}}', user.name);
    
}