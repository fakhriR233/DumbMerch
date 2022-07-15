'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.profile, {
        as:"profile",
        foreignKey: {
          name: "idUser"
        }
      })

      Users.hasMany(models.products, {
        as:"products",
        foreignKey: {
          name: "idUser"
        }
      })
    }
  }
  Users.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};