const Usuario = require('../Models/Usuarios'); 

async function readUsuarioIDMongo(data) {
    const usuario = await Usuario.findOne({
        $or: [
          { cedula: data },
          { correo: data }
        ]
      }).lean();
    return usuario;
}

async function readUsuariosMongo() {
    const usuarios = await Usuario.find();
    return usuarios;
}

async function createUsuarioMongo(data) {
    const usuarioCreado = Usuario.create(data);
    return usuarioCreado;
}

async function updateUsuarioMongo(idUsuario, data) {
    const usuarioAct = await Usuario.updateOne({ cedula: idUsuario }, data);
    return usuarioAct;
}

async function deleteUsuarioMongo(idUsuario) {
    const usuarioEliminado = await Usuario.updateOne({ cedula: idUsuario }, { activo: false});
    return usuarioEliminado;
}

module.exports = {
    readUsuarioIDMongo,
    readUsuariosMongo,
    createUsuarioMongo,
    updateUsuarioMongo,
    deleteUsuarioMongo
};