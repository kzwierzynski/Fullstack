
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url==='/'){
        res.write('Welcome');
        res.end();
    } else if (req.url==='/api/numbers'){
        res.write(JSON.stringify([1,2,3,4]));
        res.end();
    }
})

server.listen(port);
console.log('Listening on port 3000')

const EventEmitter = require('events');
const Logger = require('./logger');

const logger = new Logger();
logger.on('msgLogged', e => console.log('msgLogged', e));
logger.log('Chris');
