const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Restaurant = sequelize.define(
  "restaurant",
  {
    restaurant_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    restaurant_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    open_address: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    restaurant_phone_number: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
    },
    restaurant_cover_photo: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "restaurant",
    timestamps: false,
  }
);

module.exports = Restaurant;
