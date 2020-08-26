const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const User = require('./user')
const db = require('./db');
const { sequelize } = require('./user');

const Model = Sequelize.Model;
class Banks extends Model {
    static async findBankbyid(userId) {
        return Banks.findOne({
        where: {
            userId,
        }
    })
}
    static async findBankAccountNumber(accountNumber) {
        return Banks.findOne({
            include: [
                {
                model: User
                }
            ],
            where: {
                accountNumber,
            }
        })
    }
    static async findBanksAllUser() {
        return Banks.findAll({
            include: [
                {
                model: User,
                where: { isStaff : false ,
                    status : 1,
                }
            }
            ],
        })
    }
    static async findUserName(name) {
        return Banks.findAll({
            include: [
                {
                model: User,
                where: {
                    username : name
                }
            }
            ]
        })
    }

    static async findByEmail(name) {
        return Banks.findAll({
            include: [
                {
                model: User,
                where: {
                    email : name
                }
            }
            ],
        })
    }
}
Banks.init({
    accountNumber:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
    },
    Money: {
        type: Sequelize.DOUBLE,
        //allowNull:false,
        defaultValue: 50000,
    },
    openday: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    }
},{
    sequelize: db,
    modelName: 'banks',

});
User.hasMany(Banks);
Banks.belongsTo(User);
module.exports =Banks ;