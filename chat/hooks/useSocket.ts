import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let sharedSocket: Socket | null = null;

export function initSocket(url?: string) {
    if (typeof window === 'undefined') return null;
    if (!sharedSocket) {
        const envUrl = (process.env.NEXT_PUBLIC_SOCKET_URL as string) || undefined;
        const defaultOrigin =
            typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
        const target = url || envUrl || defaultOrigin;
        const opts = {
            transports: ['websocket', 'polling'],
        };
        sharedSocket = io(target, opts);
    }
    return sharedSocket;
}

export default function useSocket() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const s = initSocket();
        if (!s) return undefined;
        setSocket(s);

        const onConnect = () => setConnected(true);
        const onDisconnect = () => setConnected(false);

        s.on('connect', onConnect);
        s.on('disconnect', onDisconnect);

        return () => {
            s.off('connect', onConnect);
            s.off('disconnect', onDisconnect);
            // Do not call s.disconnect() here — keep shared socket alive for other consumers
        };
    }, []);

    return { socket, connected };
}
