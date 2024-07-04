const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Restaurant = require("./restaurant"); // Assuming you have a restaurant model

const MenuItemArchive = sequelize.define(
  "menu_item_archive",
  {
    item_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    restaurant_uuid: {
      type: DataTypes.UUID,
      references: {
        model: "restaurant", // Reference to the restaurant model
        key: "restaurant_uuid",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    },
  },
  {
    tableName: "menu_item_archive",
    timestamps: false,
  }
);

// Define the association if needed
MenuItemArchive.belongsTo(Restaurant, {
  foreignKey: "restaurant_uuid",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});

module.exports = MenuItemArchive;
