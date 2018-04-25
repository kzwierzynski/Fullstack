const Exchange = require('./models/exchange');

exports.getContent = function(url) {
    let exchange = {};
    // return new pending promise
    return new Promise((resolve, reject) => {
        // select http or https module, depending on reqested url
        const lib = url.startsWith('https') ? require('https') : require('http');
        const request = lib.get(url, (response) => {
            // handle http errors
            if (response.statusCode < 200 || response.statusCode > 299) {
                exchange.srvBlocked = true;
                // console.log("1", exchange.srvBlocked);
                Exchange.updateExchange(exchange, error => {
                    if (error) throw error;
                    reject(new Error('Failed to connect to external server, status code: ' + response.statusCode));
                });
            }
            // temporary data holder
            const body = [];
            // on every content chunk, push it to the data array
            response.on('data', (chunk) => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            response.on('end', () => {
                exchange.srvBlocked = false;
                // console.log("2", exchange.srvBlocked);
                Exchange.updateExchange(exchange, error => {
                    if (error) throw error;
                    resolve(body.join(''));
                });
            });
        });
        // handle connection errors of the request
        request.on('error', (err) => {
            exchange.srvBlocked = true;
            // console.log("3", exchange.srvBlocked);
            Exchange.updateExchange(exchange, error => {
                if (error) throw error;
                reject(err);
            });
        })
    });
}

  
// let intervalID = 0;

// let wait = 
//     ms => new Promise(
//         r => setTimeout(r, ms)
//     );

// //repeat func (returning a promise every "ms" miliseconds)
// exports.repeat = 
//     (ms, func) => new Promise(
//         res => (
//             intervalID = setInterval(func, ms),
//             wait(ms).then(res)
//         )
//     );


