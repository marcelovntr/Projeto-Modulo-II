const {Router} = require('express')
const usuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')
const locaisRoutes = require('./locais.routes')
const auth = require('../middlewares/auth')



const routes = new Router()

routes.use('/usuario', usuariosRoutes)
routes.post('/login', LoginController.acesso)

//rotas privadas
routes.use('/local', auth, locaisRoutes)

module.exports = routes