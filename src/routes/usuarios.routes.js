const {Router} = require('express')
const UsuarioController = require('../controllers/UsuarioController')

const usuariosRoutes = new Router()


usuariosRoutes.post('/', UsuarioController.criar
        /*
#swagger.tags = ['Usuário'],
#swagger.description = 'Endpoint para cadastrar um usuário',
#swagger.parameters['cadastraUsuario']= {
    in: 'body',
    description: 'Dados do usuário',
    required: true,
    schema: {
    $nome: 'Lima Barreto',
    $sexo: 'masculino',
    $cpf: '11122233344',
    $email: 'lima@barreto.com',
    $endereco: 'Avenida das Acácias, número: 666',
    $senha: '1w89!jhdy1',
    $dataNascimento: '1999-03-31'
    }

},
*/
)
// 'criarUsuario'


module.exports = usuariosRoutes