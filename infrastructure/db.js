
const path = require('path');
const Sequelize = require('sequelize');
const ShipmentModel = require('../models/shippingModel');
require("dotenv").config({
    path: path.join(__dirname, '../.env')
});

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    pool: {
      max: 200,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
const Shipment = ShipmentModel(sequelize,Sequelize);
sequelize.sync({force:false})
.then(()=>{
    console.log("Sincronizado");
})

module.exports = {
    Shipment
}