const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Usuario = require("./Usuario");


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
    cep: {
      type: DataTypes.STRING(8),
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
      allowNull: true,
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
// console.log(Local instanceof Model)
// Local.belongsTo(Usuario, {
//   foreignKey: 'idUsuario',
// });
module.exports = Local;
