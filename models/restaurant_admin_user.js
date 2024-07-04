const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Restaurant = require("./restaurant");

const RestaurantAdminUser = sequelize.define(
  "restaurant_admin_user",
  {
    owner_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "restaurant_admin_user",
    timestamps: false,
  }
);

RestaurantAdminUser.belongsTo(Restaurant, { foreignKey: "restaurant_uuid" });

module.exports = RestaurantAdminUser;
