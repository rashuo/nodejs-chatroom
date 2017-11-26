import Express from 'express'
const http = require('http');
const url = require('url');
import WebSocket from 'ws';

const app = Express();

app.use((req, res, next) => {
    console.log('middleware')
    req.testing = 'testing'
    return next()
})

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        wss.broadcast(JSON.stringify({
            type: 'text',
            data: JSON.parse(message)
        }))
    });

});

app.get('/', (req, res) => {
    res.send(`I'm ok!`);
});


server.listen(8000, () => {
    console.log('Listening on %d', server.address().port);
});