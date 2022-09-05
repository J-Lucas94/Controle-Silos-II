const Moviment = require('../models/Moviment')
const dbsequelize = require('../db/db')


module.exports = class BalanceController {
    static async showBalance(req, res){
        try {
            var [results] = await dbsequelize.query('SELECT silo,product,sum(amount) amount FROM moviments GROUP BY silo,product', { raw: true })
            console.log(results)
            res.render('balance/show', { balance: results })
        } catch (error) {
            console.log(error)
        }
    }
}