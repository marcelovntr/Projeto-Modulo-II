const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Usuario = connection.define("usuarios",
  {
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    sexo: {
      type: DataTypes.ENUM("masculino", "feminino", "outro"),
      allowNull: true,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    endereco: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    senhaHash: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    dataNascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Usuario
