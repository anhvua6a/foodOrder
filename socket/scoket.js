let app = require('../app');
let http = require('http');
let port = process.env.PORT || '9999';
app.set('port', port);
let server = http.createServer(app);
const { Server } = require('socket.io');
let io = new Server(server);


app.set('socket', io)

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, (e) => {
    console.log(`Server is running at http://localhost:${port}`)
});