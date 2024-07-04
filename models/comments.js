const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Customer = require("./customer");
const Restaurant = require("./restaurant");

const Comment = sequelize.define(
  "comments",
  {
    comment_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    rating: {
      type: DataTypes.DOUBLE,
    },
    comment: {
      type: DataTypes.STRING(255),
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "comments",
    timestamps: false,
  }
);

Comment.belongsTo(Customer, { foreignKey: "customer_uuid" });
Comment.belongsTo(Restaurant, { foreignKey: "restaurant_uuid" });

module.exports = Comment;
