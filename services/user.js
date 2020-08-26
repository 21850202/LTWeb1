const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;
class User extends Model {
    static async findById(id){
      return User.findByPk(id);
    }
    async updatStatus(){
      this.status = 1;
      return this.save();
      }
    static async findByUsername(username){
        return User.findOne({
            where: {
              username,
            }
        });
      }
      static async findByEmail(email){
        return User.findOne({
            where: {
              email,
            }
        });
      }
      static async findTokenNull() {
        return User.findAll({
            where: {
                token: null
            }
        });
    };
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    static verifyPassword(password,passwordHash) {
        return bcrypt.compareSync(password, passwordHash);
    }
}
User.init({
  // attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  confirmpassword: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  identification: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  identificationnumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  DateRange: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  avatar: {
    type:Sequelize.BLOB,
    allowNull: false
    //defaultValue: null,
  },
  token: {
    type: Sequelize.STRING,
  },
  isStaff: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
},
  status : {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
},
}, {
  sequelize: db,
  modelName: 'user',
});

module.exports = User;