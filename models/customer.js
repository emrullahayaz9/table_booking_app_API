const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Customer = sequelize.define(
  "customer",
  {
    customer_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(255),
    },
    phone_number: {
      type: DataTypes.STRING(11),
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "customer",
    timestamps: false,
  }
);

module.exports = Customer;
