const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Reservation = require("./reservations");
const MenuItem = require("./menu_item");

const ReservationsMenuItem = sequelize.define(
  "reservations_menu_item",
  {
    reservation_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Reservation,
        key: "reservation_uuid",
      },
    },
    menu_item_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: MenuItem,
        key: "item_uuid",
      },
    },
  },
  {
    tableName: "reservations_menu_item",
    timestamps: false,
  }
);

module.exports = ReservationsMenuItem;
