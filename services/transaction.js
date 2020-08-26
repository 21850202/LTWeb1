const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const User = require('./user')
const db = require('./db');
const { STRING } = require('sequelize');

const Model = Sequelize.Model;
class Transaction extends Model {
    static async findTransactionByCode(code) {
        return Transaction.findOne({
        where: {
            code,
        }
    })
}
    static async findAllTransactionhistory(userId) {
        return Transaction.findAll({
            where: {
                userId,
            }
        })
    }
    
}
Transaction.init({
    iscode:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
    },
    accountSender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    accountReceiver: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nameReceiver: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    money: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    },
    date: {
        type: Sequelize.STRING,
    },  
    fee: {
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    content:{
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    code :{
        type: Sequelize.STRING,
        allowNull:false,
    }


},{
    sequelize: db,
    modelName: 'transaction',

});
User.hasMany(Transaction);
Transaction.belongsTo(User);
module.exports =Transaction ;