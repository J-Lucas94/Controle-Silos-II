var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Preencha o campo nome !"
            }
        }
    },

    password : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Preencha o campo senha !"
            }
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg : "Preencha um E-MAIL valido ! "
            }
        }
    }

})

// Usuarios.sync({alter:true})

module.exports = User