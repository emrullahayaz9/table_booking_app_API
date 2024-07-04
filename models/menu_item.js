const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Restaurant = require("./restaurant");
const Category = require("./category");

const MenuItem = sequelize.define(
  "menu_item",
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
      type: DataTypes.BLOB,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    category_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "category_uuid",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "menu_item",
    timestamps: false,
  }
);

MenuItem.belongsTo(Restaurant, { foreignKey: "restaurant_uuid" });
MenuItem.belongsTo(Category, { foreignKey: "category_uuid" });

module.exports = MenuItem;
