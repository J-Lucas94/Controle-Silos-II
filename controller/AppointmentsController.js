const Moviments = require('../models/Moviment')
const User = require('../models/User')

module.exports = class AppointmentsController {

    static async createAppointments(req, res){
        res.render("appointments/create")
    }

    static async createAppointmentsPost(req, res){
        const appointments = {
            UserId: req.user.id,
            silo: req.body.silo,
            product: req.body.product,
            amount: req.body.amount,
            batch: req.body.batch,
            date: req.body.date,
            type: "Apontamento",
        }

        try {
            await Moviments.create(appointments);
                res.status(200).json({message: "Apontamento realizado com sucesso !"});
                return


        } catch (error) {
            res.status(400).json({message: "Não foi possivel registrar o carregamento !" + error});
            return
        }

    }

}