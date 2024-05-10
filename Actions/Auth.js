const axios = require("axios");

async function obtenerUsuario(idUsuario) {
  try {
    const respuesta = await axios.get(`http://localhost:8080/usuarios/${idUsuario}`);
    return respuesta.data;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = obtenerUsuario;