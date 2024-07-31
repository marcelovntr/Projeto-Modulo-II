const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Local = connection.define(
  "locais",
  {
    nomeLocal: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    localidade: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    praticasPermitidas: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    idUsuario: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Local;
