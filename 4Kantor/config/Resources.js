const Exchange = require('../models/exchange');

// let initExchange = new Exchange();
let initExchange = new Exchange(); //with no "_id", bacause if document exists, .findOneAndUpdate() tried to overwrite the existing _id
const initWallet = {
    "PLN" : 1000000,
    "USD" : 100000,
    "EUR" : 100000,
    "CHF" : 100000,
    "RUB" : 50000000,
    "CZK" : 50000000,
    "GBP" : 100000
}

initExchange.wallet = initWallet;
initExchange.current = {};
initExchange.srvBlocked = false;

// initialize available resources of the exchange office
exports.initWallet = function() {
        // return new pending promise
    return new Promise((resolve, reject) => {
        Exchange.getExchange( (err, exchange) => {
            if (err) {
                reject(new Error("Failed to initialize the Exchange office wallet: " + err));

            } else if (!exchange) {
                Exchange.setExchange(initExchange, (err, initVals) => {
                    if (err) {
                        reject(new Error("Failed to initialize the Exchange office wallet: " + err));
                    } else {
                        resolve("Exchange office wallet: " + initExchange.wallet + " successfully initialized");
                    }
                });

            } else if (exchange) {
                resolve("Exchange office already had been initialized");
            }
        });
    });
}

//update current exchange rates in DB
exports.updateRates = function(currData) {
    let upTime = new Date();
    let exchange = {};
    exchange.current = currData;
// return new pending promise
    return new Promise((resolve, reject) => {
        Exchange.updateExchange(exchange, (err) => {
            if (err) {
                reject(new Error("Failed to update the exchange rates: " + err));
            } else {
                resolve("Exchange rates updated: " + upTime)
            }
        });
    });
}