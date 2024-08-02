const Usuario = require('../models/Usuario')
const Local = require('../models/Local');


class LocalController {
  async cadastro(request, response) {
    try {
      console.log(request.usuarioId);
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
        //validação de limites -+90 graus
        if (typeof dados.latitude !== "string") {
          return response
            .status(400)
            .json({ mensagem: "Latitude deve ser uma string." });
        }
      }
      if (dados.longitude) {
        //validação de limites -+180 graus
        if (typeof dados.longitude !== "string") {
          return response
            .status(400)
            .json({ mensagem: "longitude deve ser uma string." });
        }
      }

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

      //validar idUsuario se já vem do request??? <--------------

      /*QUERIES */
      //fazer um findByPk???????????????? se usuário existe
      const localNovo = await Local.create({
        ...dados,
        idUsuario: request.usuarioId,
      });

      response.status(201).json({
        mensagem: "local cadastrado com sucesso",
        nome: localNovo.nomeLocal,
        idCriador: localNovo.idUsuario, //dados.idUsuario
      });
    } catch (error) {
      response.status(500).json({ mensagem: "erro no cadastro do local" });
    }
  }

  async listarTodos(request, response) {
    try {
      const locaisGeral = await Local.findAll({
        attributes: [
          ["nomeLocal", "Nome"],
          ["descricao", "Descrição"],
          ["localidade", "Local"],
          ["cep", "CEP"],
          ["latitude", "Latitude"],
          ["longitude", "Longitude"],
          ["praticasPermitidas", "Atividades"],
        ],
        order: [["nomeLocal"]],
      });

      response.status(200).json(locaisGeral);
    } catch (error) {
      response.status(500).json({ mensagem: "erro ao listar locais" });
    }
  }

  async listarEspecifico(request, response) {

    try {
      const { local_id } = request.params; //OU: const local_id = request.params.local_id;
      console.log("id do request:", local_id);
      console.log("id do token:", request.usuarioId); //vem do middleware auth

      if(!local_id){return response.status(400).json({mensagem: "o ID do local não foi informado!"})}

        //opção sem usar include/"join"; usando minha lógica após o find
      const localEsp = await Local.findByPk(local_id);

      if (!localEsp) {
        return response
          .status(404)
          .json({ mensagem: "Local não encontrado para este ID" });
      }
      // console.log(localEsp)
      console.log("Coluna idUsuario:", localEsp.idUsuario);
      if (localEsp.idUsuario !== request.usuarioId) {
        return response
          .status(401)
          .json({ mensagem: "O local buscado não foi cadastrado por você" });
      }

      response.status(200).json({
        Local: localEsp.nomeLocal,
        Descrição: localEsp.descricao,
        Localidade: localEsp.localidade,
        CEP: localEsp.cep,
        Latitude: localEsp.latitude,
        Longitude: localEsp.longitude,
        Práticas: localEsp.praticasPermitidas,
      });
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .json({ mensagem: "erro ao listar o local específico" });
    }
  }

  async deletar(request, response) {
    try {
      const { local_id } = request.params;
      if(!local_id){return response.status(400).json({mensagem: "o ID do local não foi informado!"})}

      
      const localEspec = await Local.findByPk(local_id)
      if (!localEspec) {
        return response
          .status(404)
          .json({ mensagem: "Local não encontrado para este ID ou permissão negada" });
      }

      //opção de busca usando agora include
      const localUsuario = await Local.findByPk(local_id, {
        include: [{
          model: Usuario,
          attributes: [], 
          where: { id: request.usuarioId } 
    }]});
    if (!localUsuario) {
      return response
        .status(401)
        .json({ mensagem: "Você não tem permissão para excluir este local!" });
    }
     

      await localEspec.destroy()
      response.status(204).json();
    } catch (error) {
      console.log(error)
      response.status(500).json({ mensagem: "Erro ao excluir o local!" })
    }
  }

  async atualizar(request, response) {}
}

module.exports = new LocalController();
