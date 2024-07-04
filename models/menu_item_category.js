const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const MenuItem = require("./menu_item");
const Category = require("./category");

const MenuItemCategory = sequelize.define(
  "menu_item_category",
  {
    menu_item_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: MenuItem,
        key: "item_uuid",
      },
    },
    category_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Category,
        key: "category_uuid",
      },
    },
  },
  {
    tableName: "menu_item_category",
    timestamps: false,
  }
);

module.exports = MenuItemCategory;
