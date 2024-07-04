const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("foodapp", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
