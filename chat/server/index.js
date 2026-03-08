// server/index.js
const http = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = parseInt(process.env.PORT, 10) || 3000;
const SOCKET_CORS_ORIGIN = process.env.NEXT_SOCKET_CORS_ORIGIN || '*';

let io;
let server;

async function start() {
    await app.prepare();

    server = http.createServer(async (req, res) => {
        if (req.method === 'POST' && req.url === '/broadcast') {
            let body = '';
            for await (const chunk of req) body += chunk;
            try {
                const event = JSON.parse(body || '{}');
                if (io) io.emit('ig_event', event);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end('OK');
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('invalid json');
            }
        }

        // Delegate to Next.js for all other requests
        return handle(req, res);
    });

    io = new Server(server, {
        cors: { origin: SOCKET_CORS_ORIGIN },
    });

    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);
        socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
    });

    server.listen(PORT, () => console.log(`Server listening on ${PORT}`));

    // graceful shutdown
    const shutdown = (signal) => async () => {
        console.log(`Received ${signal}, shutting down...`);
        try {
            if (io) io.close();
            if (server) server.close(() => process.exit(0));
            // force exit after timeout
            setTimeout(() => process.exit(0), 5000).unref();
        } catch (err) {
            console.error('Error during shutdown', err);
            process.exit(1);
        }
    };

    process.on('SIGINT', shutdown('SIGINT'));
    process.on('SIGTERM', shutdown('SIGTERM'));
}

start().catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
});

