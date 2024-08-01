const Local = require("../models/Local");

class LocalController {
  async cadastro(request, response) {
    try {
      console.log(request.usuarioId)
      const dados = request.body;
      //VALIDAÇÕES
      if (!dados.nomeLocal) {
        return response
          .status(400)
          .json({ mensagem: "o nome do local é obrigatório!" });
      }
      if (typeof dados.nomeLocal !== "string" || dados.nomeLocal.length > 150) {
        return response
          .status(400)
          .json({ mensagem: "nome por extenso e no máximo 150 caracteres!" });
      }

      if (!dados.descricao) {
        return response
          .status(400)
          .json({ mensagem: "a descrição é obrigatória!" });
      }
      if (typeof dados.descricao !== "string" || dados.descricao.length > 200) {
        return response
          .status(400)
          .json({ mensagem: "texto com no máximo 200 caracteres!" });
      }

      if (!dados.localidade) {
        return response
          .status(400)
          .json({ mensagem: "a localidade é obrigatória!" });
      }
      if (
        typeof dados.localidade !== "string" ||
        dados.localidade.length > 150
      ) {
        return response
          .status(400)
          .json({ mensagem: "texto com no máximo 150 caracteres!" });
      }

      if (!dados.cep || dados.cep.length !== 8) {
        return response
          .status(400)
          .json({ mensagem: "o CEP é obrigatório e possui 8 dígitos!" });
      }
      if (typeof dados.cep !== "string") {
        dados.cep = Number(dados.cep);
      }

      if (dados.latitude) {
        if (typeof dados.latitude !== "string") {
          return response
            .status(400)
            .json({ mensagem: "Latitude deve ser uma string." });
        }
      }
      //validação de limites -+90 graus
      if (dados.longitude) {
        if (typeof dados.longitude !== "string") {
          return response
            .status(400)
            .json({ mensagem: "longitude deve ser uma string." });
        }
      }
      //validação de limites -+180 graus

      if (!dados.praticasPermitidas) {
        return response
          .status(400)
          .json({ mensagem: "é necessário inserir ao menos uma prática!" });
      }
      if (
        typeof dados.praticasPermitidas !== "string" ||
        dados.praticasPermitidas.length > 200
      ) {
        return response
          .status(400)
          .json({ mensagem: "texto com no máximo 200 caracteres!" });
      }

      //validar idUsuario se já vem do request???

      /*QUERIES */
      //fazer um findByPk???????????????? se usuário existe
      const localNovo = await Local.create({
        ...dados,
        idUsuario: dados.usuarioId,
      });

      response.status(201).json({
        nome: localNovo.nomeLocal,
        idCriador: dados.idUsuario
      })
    } catch (error) {
      response.status(500).json({ mensagem: "erro no cadastro do local" });
    }
  }

  async listarTodos(request, response) {}

  async listarEspecifico(request, response) {
    /*
Garantir que apenas o usuário que cadastrou o local tenha acesso a essas informações.
-findByPk(local_id)
-if(usuarioId === id do token)
*/
    /*
ou...
find com
include/join
if(...)
response(localEncontrado)
*/
  }

  async deletar(request, response) {}

  async atualizar(request, response) {}
}

module.exports = new LocalController();
