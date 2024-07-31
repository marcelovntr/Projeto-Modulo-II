const Usuario = require("../models/Usuario");
const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const cpfPattern = new RegExp(/^\d+$/); // --> ou: !/^\d{11}$/
const sexoValido = ["masculino", "feminino", "outro"];

class UsuarioController {
  async criar(request, response) {
    try {
      const dados = request.body;
      //-->validações<--
      if (!dados.nome) {
        return response.status(400).json({ mensagem: "o nome é obrigatório!" });
      }

      if (typeof dados.nome !== "string" || dados.nome.length > 150) {
        return response.status(400).json({
          mensagem:
            "O nome deve ser uma string e conter no máximo 150 caracteres!",
        });
      }

      if (!dados.email) {
        return response
          .status(400)
          .json({ mensagem: "o email é obrigatório!" });
      }
      if (emailPattern.test(dados.email === false)) {
        return response
          .status(400)
          .json({ mensagem: "formato de email inválido!" });
      }

      //a migração permite sexo nulo
      if (!sexoValido.includes(dados.sexo)) {
        return response
          .status(400)
          .json({ mensagem: "O sexo deve ser masculino, feminino ou outro!" });
      }

      if (!dados.cpf) {
        return response.status(400).json({ mensagem: "o CPF é obrigatório!" });
      }

      //CONSIDERAR: const cpfString = String(dados.cpf);
      if (
        typeof dados.cpf !== "string" ||
        dados.cpf.length !== 11 ||
        !cpfPattern.test(dados.cpf)
      ) {
        return response.status(400).json({
          mensagem:
            "O CPF deve conter no máximo 11 caracteres (retire . e - )!",
        });
      }

      if (
        !dados.endereco ||
        dados.endereco.lentgth > 200 ||
        typeof dados.endereco !== "string"
      ) {
        return response.status(400).json({
          mensagem:
            "O endereço é obrigatório e deve conter no máximo 200 caracteres!",
        });
      }
      //mudar para senhaHash???
      if (!dados.senha) {
        response.status(400).json({ mensagem: "a senha é obrigatória" });
      }
      if (dados.senha.length !== 10) {
        response.status(400).json({
          mensagem: "a senha deve conter obrigatoriamente 10 dígitos",
        });
      }
      //"dataNascimento": "1990-01-01"
      if (!dados.dataNascimento) {
        return response
          .status(400)
          .json({ mensagem: "A data de nascimento é obrigatória!" });
      }

      const dataNascimento = new Date(dados.dataNascimento);

      if (isNaN(dataNascimento.getTime())) {
        return response.status(400).json({
          mensagem:
            "A data de nascimento deve ser uma data válida no formato AAAA-MM-DD!",
        });
      }

      //pesquisar se já há usuário: findOne()
      const usuarioCriado = await Usuario.create(dados);
    } catch (error) {}
  }
}

module.exports = new UsuarioController();
