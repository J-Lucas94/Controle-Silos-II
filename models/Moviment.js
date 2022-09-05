var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')
const User = require('./User')

const Moviment = db.define('Moviment', {

    silo :{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Por favor Preencha o campo Silo!"
            }
        }
    },

    product: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Por favor Preencha o campo Produtos!"
            }
        }
    },

    amount: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Por favor Preencha o campo Quantidade!"
            }
        }
    },

    batch: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Por favor preencha o campo Lote !"
            }
        }
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Por favor preencha o campo Lote !"
            }
        }
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Por favor Preencha o campo Data !"
            }
        }
    }

})


Moviment.belongsTo(User)
User.hasMany(Moviment)


// Moviment.sync({force:true})

module.exports = Moviment