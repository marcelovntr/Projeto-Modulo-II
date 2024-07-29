const {Router} = require('express')
const usuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')
const locaisRoutes = require('./locais.routes')



const routes = new Router()

routes.use('/usuario', usuariosRoutes)
routes.post('/login', LoginController.acesso)

//rotas privadas
routes.use('/local', locaisRoutes)

module.exports = routes