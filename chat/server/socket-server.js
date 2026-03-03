// server/socket-server.js
const http = require('http');
const { Server } = require('socket.io');

const PORT = 4000;

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/broadcast') {
        let body = '';
        for await (const chunk of req) body += chunk;
        try {
            const event = JSON.parse(body || '{}');
            io.emit('ig_event', event);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            return res.end('OK');
        } catch (err) {
            res.writeHead(400);
            return res.end('invalid json');
        }
    }
    res.writeHead(404);
    res.end();
});

const io = new Server(server, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    console.log('client connected', socket.id);
    socket.on('disconnect', () => console.log('client disconnected', socket.id));
});

server.listen(PORT, () => console.log(`Socket server listening on ${PORT}`));