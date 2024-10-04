export type User = {
    id: number;
    name: string;
    ready?: boolean;
    username?: string;
    gender?: "boy"|"girl"|null;
    avatar?: string;
};