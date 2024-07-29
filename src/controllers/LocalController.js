class LocalController{
async cadastro(request, response){

}

async listarTodos(request, response){

}

async listarEspecifico(request, response){
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

async deletar(request, response){

}

async atualizar(request, response){

}
}

module.exports = new LocalController()