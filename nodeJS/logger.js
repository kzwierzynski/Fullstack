const EventEmitter = require('events');

class Logger extends EventEmitter{
    
    log(msg) {
        console.log('Hello', msg)
        //raise event
        this.emit('msgLogged', {id: 1});
    }
}

module.exports = Logger;