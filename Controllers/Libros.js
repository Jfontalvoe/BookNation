const jwt = require("jsonwebtoken");
const dotend = require("dotenv");
dotend.config();
const {
  readLibroIDMongo,
  readLibrosMongo,
  createLibroMongo,
  updateLibroMongo,
  deleteLibroMongo,
} = require("../Actions/Libros");
const _ = require("lodash");

async function readLibroID(data) {
  const busqueda = await readLibroIDMongo(data);
  if (!busqueda || !busqueda.activo) {
    throw new Error("El libro no existe");
  }
  return busqueda;
}

async function readLibros(data) {
  const busqueda = await readLibrosMongo(data);
  if (busqueda.length === 0) {
    throw new Error("No se encontraton libros");
  }
  return busqueda;
}

async function createLibro(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const idUsuario = decodedToken._id;
  const creacion = await createLibroMongo(idUsuario, data);
  return creacion;
}

async function updateLibro(idLibro, data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const idUsuario = decodedToken._id;
  const infLibro = await readLibroID(idLibro);

  if (_.toString(infLibro.idUsuario) !== idUsuario) {
    throw new Error("No tienes permitido hacer actualizaciones en este libro");
  }
  const actualizacion = await updateLibroMongo(infLibro, data);
  return actualizacion;
}

async function removeLibro(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const idUsuario = decodedToken._id;
  const infLibro = await readLibroID(data);

  if (_.isEqual(idUsuario, infLibro.idUsuario) === false) {
    throw new Error("No tienes permitido eliminar este libro");
  }
  if (!infLibro.activo) {
    throw new Error("Este libro ya fue eliminado");
  }
  const eliminacion = await deleteLibroMongo(data);
  return eliminacion;
}

module.exports = {
  readLibroID,
  readLibros,
  createLibro,
  updateLibro,
  removeLibro,
};
