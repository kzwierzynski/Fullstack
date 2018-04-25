const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const Exchange = require('../models/exchange');
const User = require('../models/user');

const currCodes = ["USD", "EUR", "CHF", "RUB", "CZK", "GBP"];
const currUnits = [1, 1, 1, 100, 100, 1];
// const config = require('../config/database')

// router.post('/confirm', (req, res) => {
//     Exchange.updateExchange( (err, user) => {
//         if (err) {
//             res.json({success : false,  msg: "Failed to update exchange data to server"})
//         } else {
//             res.json({success : true,  msg: "Current exchange data updated"})
//         }
//     });

//     res.json({
//         user: req.user
//     })
// });


//Get current rates
router.get('/current', (req, res) => {
    Exchange.getExchange( (err, exchange) => {
        if (err) throw err;
        if (!exchange) {
            res.json({success : false,  
                msg: "Failed to get current exchange rates from DB",
                srvBlocked: exchange.srvBlocked
            })
        } else {
            res.json({
                success : true,
                msg: "Current exchange rates received",
                current: exchange.current,
                srvBlocked: exchange.srvBlocked
            })
        }
    });
});

//authenticate transaction, only if logged in
router.post('/buy', passport.authenticate('jwt', { session: false }), (req, res) => {
    let num_code = req.body.num_code;
    let user_id = req.body.user_id;
    let buy_currency = req.body.buy_currency * currUnits[num_code];
    let code = currCodes[num_code];

    User.getUserById(user_id, (err, user) => {
        if (err) throw err;
        if (!user){
            return res.json({'success': false, msg: 'User not found in DB'});
        }
        let user_pln = user.wallet.PLN;
        let user_currency = user.wallet[code];

        Exchange.getExchange( (err, exchange) => {
            if (err) throw err;
            if (!exchange) {
                return res.json({success : false,  msg: "Failed to get necessary data from DB"});
            }

            // buy wrt current exchange rate from Server
            let buy_pln = buy_currency / currUnits[num_code] * exchange.current.items[num_code].sellPrice;
            let office_pln = exchange.wallet.PLN;
            let office_currency = exchange.wallet[code];            
            
            if (buy_pln > user_pln) {
                return res.json({success : false,  msg: "You don't have enough PLN for this transaction. Please try again"});
            }
            if (buy_currency > office_currency) {
                return res.json({success : false,  msg: "We're sorry, currently we don't have enough " + code + " for this transaction"});
            }

                let newOfficeWallet = exchange;
                newOfficeWallet.wallet[code] = office_currency - buy_currency;
                newOfficeWallet.wallet.PLN = office_pln + buy_pln;
                let newUserWallet = user;
                newUserWallet.wallet.PLN = user_pln - buy_pln;
                newUserWallet.wallet[code] = user_currency + buy_currency;

                Exchange.updateExchange(newOfficeWallet, err => {
                    if (err) throw err;

                    User.updateUser(user_id, newUserWallet, (err, updatedUser) => {
                        if (err) throw err;
                        console.log("Transaction completed- you've bought " + buy_currency + code + " for " + buy_pln + "PLN");
                        return res.json({
                            success : true,  
                            msg: "Transaction completed- you've bought " + buy_currency + code + " for " + buy_pln + "PLN",
                            wallet: updatedUser.wallet
                        });
                    });
                });

        });
    });
});

//authenticate transaction, only if logged in
router.post('/sell', passport.authenticate('jwt', { session: false }), (req, res) => {
    let num_code = req.body.num_code;
    let user_id = req.body.user_id;
    let sell_currency = req.body.sell_currency * currUnits[num_code];
    let code = currCodes[num_code];

    User.getUserById(user_id, (err1, user) => {
        if (err1) throw err1;
        if (!user){
            return res.json({'success': false, msg: 'User not found in DB'});
        }
        let user_pln = user.wallet.PLN;
        let user_currency = user.wallet[code];

        Exchange.getExchange( (err2, exchange) => {
            if (err2) throw err2;
            if (!exchange) {
                return res.json({success : false,  msg: "Failed to get necessary data from DB"});
            }

            // sell wrt current exchange rate from Server
            let sell_pln = sell_currency / currUnits[num_code] * exchange.current.items[num_code].purchasePrice;
            let office_pln = exchange.wallet.PLN;
            let office_currency = exchange.wallet[code];
            
            if (sell_currency > user_currency) {
                return res.json({success : false,  msg: "You don't have enough " + code + " for this transaction. Please try again"});
            }
            if (sell_pln > office_pln) {
                return res.json({success : false,  msg: "We're sorry, currently we don't have enough PLN for this transaction"});
            }

                let newOfficeWallet = exchange;
                newOfficeWallet.wallet[code] = office_currency + sell_currency;
                newOfficeWallet.wallet.PLN = office_pln - sell_pln;
                let newUserWallet = user;
                newUserWallet.wallet[code] = user_currency - sell_currency;
                newUserWallet.wallet.PLN = user_pln + sell_pln;

                Exchange.updateExchange(newOfficeWallet, err3 => {
                    if (err3) throw err3;

                    User.updateUser(user_id, newUserWallet, (err4, updatedUser) => {
                        if (err4) throw err4;
                        return res.json({
                            success : true,  
                            msg: "Transaction completed- you've sold " + sell_currency + code + " for " + sell_pln + "PLN",
                            wallet: updatedUser.wallet
                        });
                    });
                });

        });
    });
});


module.exports = router;