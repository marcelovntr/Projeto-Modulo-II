const { Router } = require('express')
const LocalController = require('../controllers/LocalController')


const locaisRoutes = new Router()

locaisRoutes.post('/', LocalController.cadastro)
locaisRoutes.get('/', LocalController.listarTodos)
locaisRoutes.get('/:local_id', LocalController.listarEspecifico)
locaisRoutes.delete('/:local_id', LocalController.deletar)
locaisRoutes.put('/:local_id', LocalController.atualizar)


module.exports = locaisRoutes