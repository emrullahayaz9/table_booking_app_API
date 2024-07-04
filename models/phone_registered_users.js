const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const PhoneRegisteredUser = sequelize.define(
  "phone_registered_users",
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    phone_number: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: "phone_registered_users",
    timestamps: false,
  }
);

module.exports = PhoneRegisteredUser;
