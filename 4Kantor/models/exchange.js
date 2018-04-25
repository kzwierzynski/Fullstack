const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const config = require('../config/database')

const exchangeSchema = mongoose.Schema({
    wallet: { 
        type: {
            PLN: {
                type: Number,
                default: 100000,
                required : true
            },  
            USD: {
                type: Number,
                default: 100000,
                required : true
            },  
            EUR: {
                type: Number,
                default: 100000,
                required : true
            },  
            CHF: {
                type: Number,
                default: 100000,
                required : true
            },  
            RUB: {
                type: Number,
                default: 1000000,
                required : true
            },  
            CZK: {
                type: Number,
                default: 1000000,
                required : true
            },
            GBP: {
                type: Number,
                default: 100000,
                required : true
            }
        }   
    },
    current: {
        type: {
        publicationDate: Date,
        currencies:
        [ { name: String,
            code: String,
            unit: Number,
            purchasePrice: Number,
            sellPrice: Number,
            averagePrice: Number } ]
        }
    },
    srvBlocked: {
        type: Boolean,
        default: false
    }
    // ,
    // history: [{
    //     publicationDate: Date,
    //     usd: Number,
    //     eur: Number,
    //     chf: Number,
    //     rub: Number,
    //     czk: Number,
    //     gbp: Number
    // }]
});

const Exchange = mongoose.model('Exchange', exchangeSchema);
module.exports = Exchange;

module.exports.getExchange = function (callback){
    Exchange.findOne({}, callback);
}

module.exports.setExchange = function (newExchange, callback){
    Exchange.findOneAndUpdate({}, newExchange, {upsert: true}, callback);
}

module.exports.updateExchange = function (editExchange, callback){
    Exchange.update( {}, editExchange, callback);
}