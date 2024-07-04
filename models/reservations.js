const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Customer = require("./customer");
const Restaurant = require("./restaurant");

const Reservation = sequelize.define(
  "reservations",
  {
    reservation_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    person_count: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    total: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "reservations",
    timestamps: false,
  }
);

Reservation.belongsTo(Customer, { foreignKey: "customer_uuid" });
Reservation.belongsTo(Restaurant, { foreignKey: "restaurant_uuid" });

module.exports = Reservation;
