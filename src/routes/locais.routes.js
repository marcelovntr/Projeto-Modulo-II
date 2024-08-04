const { Router } = require('express')
const LocalController = require('../controllers/LocalController')
const MapController = require('../controllers/MapController')


const locaisRoutes = new Router()

locaisRoutes.post('/', LocalController.cadastro)
locaisRoutes.get('/', LocalController.listarTodos)
locaisRoutes.get('/:local_id', LocalController.listarEspecifico)
locaisRoutes.delete('/:local_id', LocalController.deletar)
locaisRoutes.put('/:local_id', LocalController.atualizar)
//obtenção de link
locaisRoutes.get('/maps/:local_id', MapController.listarLinK)


module.exports = locaisRoutes