const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const OAuth2Register = sequelize.define(
  "OAuth2_register",
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    oauth_provider: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    oauth_provider_id: {
      type: DataTypes.STRING(255),
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
    tableName: "OAuth2_register",
    timestamps: false,
  }
);

module.exports = OAuth2Register;
