const jwt = require("jsonwebtoken");
const dotend = require("dotenv");
  dotend.config();

  const {
  readUsuarioIDMongo,
  readUsuariosMongo,
  createUsuarioMongo,
  updateUsuarioMongo,
  deleteUsuarioMongo
} = require("../Actions/Usuarios");
  
  async function readUsuarioID(data) {
    const busqueda = await readUsuarioIDMongo(data);
    if (!busqueda || !busqueda.activo) {
      throw new Error("El usuario no existe");
    }

    return busqueda;
  }
  
  async function readUsuarios() {
    const busqueda = await readUsuariosMongo();
    if (!busqueda) {
      throw new Error("Usuarios no encontrados");
    }

    return busqueda;
  }
  
  async function createUsuario(data) {
    const cedula = data.cedula;
    const usuario = await readUsuariosMongo(cedula);
    if (usuario && usuario.activo) {
      throw new Error("Este usuario ya existe");
    } 
    const creacion = await createUsuarioMongo(data);

    return creacion;
  }
  
  async function updateUsuario(data, token) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); 
    const idUsuario = decodedToken.cedula;
    const usuarioExiste = await readUsuarioIDMongo(idUsuario);
    if (!usuarioExiste || !usuarioExiste.activo) {
      throw new Error("Usuario no encontrado");
    }
    const actualizacion = await updateUsuarioMongo(idUsuario, data);

    return actualizacion;
  }
  
  async function deleteUsuario(data, token) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); 
    const idUsuario = decodedToken.cedula;
    if (idUsuario !== data) {
      throw new Error("No se encuentra coincidencia para el usuario");
    }
    const usuarioExiste = await readUsuarioIDMongo(idUsuario);
  
    if (!usuarioExiste || !usuarioExiste.activo) {
      throw new Error("No se encontró el usuario o ya ha sido eliminado");
    }
    const eliminacion = await deleteUsuarioMongo(data);
    
    return eliminacion;
  }
  
  module.exports = {
    readUsuarioID,
    readUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
  };