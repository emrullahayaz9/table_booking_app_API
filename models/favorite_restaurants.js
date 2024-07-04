const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Customer = require("./customer");
const Restaurant = require("./restaurant");

const FavoriteRestaurant = sequelize.define(
  "favorite_restaurants",
  {
    customer_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Customer,
        key: "customer_uuid",
      },
    },
    restaurant_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Restaurant,
        key: "restaurant_uuid",
      },
    },
  },
  {
    tableName: "favorite_restaurants",
    timestamps: false,
  }
);

module.exports = FavoriteRestaurant;
