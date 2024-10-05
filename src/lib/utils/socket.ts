import { io } from 'socket.io-client';

const URL = `${import.meta.env.PUBLIC_SOCKET_URL}`;
export const socket = io(URL,{
    autoConnect: false,
});