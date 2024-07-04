const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Category = sequelize.define(
  "category",
  {
    category_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category_description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    restaurant_uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "category",
    timestamps: false,
  }
);

module.exports = Category;
