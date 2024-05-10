const jwt = require("jsonwebtoken");
const dotend = require("dotenv");
 dotend.config();
const _ = require("lodash");
const readLibroID = require("../Controllers/Libros").readLibroID;
const updateLibro = require("../Controllers/Libros").updateLibro;
const { 
    readPedidoIDMongo,
    readPedidosMongo,
    createPedidoMongo,
    updatePedidoMongo,
    deletePedidoMongo, } = require("../Actions/Pedidos");

async function readPedidoID(data) {
  const pedido = await readPedidoIDMongo(data);
  if (!pedido) {
    throw new Error("Pedido no encontrado");
  }
  return pedido;
}

async function readPedidos() {
    const pedidos = await readPedidosMongo();
    return pedidos;
  }

async function createPedido(data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const idUsuario = decodedToken._id;
  const librosPromise = data.libros.map((libro)  =>  readLibroID(libro));
  const libros = await Promise.all(librosPromise);

  const total = libros.reduce(
    (acum, libro) => acum + parseFloat(libro.price.toString()),
    0
  );
  const creacion = await createPedidoMongo(
    idUsuario,
    total,
    data.libros
  );
  return creacion;
}

async function updateCancelada(infPedido, idPedido, data) {
  if (infPedido.estado === "cancelado" && data === "cancelado") {
    throw new Error("Esta pedido ya fue cancelado");
  }

  const actualizacion = await updatePedidoMongo(idPedido, data);
  return actualizacion;
}

async function updatePedido(idPedido, data, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const idUsuario = decodedToken._id;
  const infPedido = await readPedidoIDMongo(idPedido);
  console.log(infPedido);

  if (_.toString(infPedido.idUsuario) === idUsuario && data.estado === "cancelado") {
    if (infPedido.estado === "cancelado") {
      throw new Error("La cancelación de este pedido ya fue realiazada");
    }
    return updateCancelada(infPedido, idPedido, data);
  }

  const idLibro = infPedido.libros.map((libro) => libro.idLibro);
  const librosPromise = idLibro.map((libro) => readPedidoID(libro));
  const libros = await Promise.all(librosPromise);

  const librosActivos = libros.filter((libro) => libro.activo);
  if (librosActivos.length !== idLibro.length) {
    throw new Error("Ya se han vendido ciertos libros");
  }

  const librosUsuario = libros.filter((libro) => _.toString(libro.idUsuario) === idUsuario);
  if (librosUsuario.length !== idLibro.length) {
    throw new Error("No puede actualizar porque hay libros que no le pertenecen");
  }

  const actualizacion = await updatePedidoMongo(idPedido, data);
  for (const libro of libros) {
    console.log(libro);
    await updateLibro(libro._id, { activo: false }, token);
  }
  return actualizacion;
}


async function deletePedido(idPedido, token) {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const idUsuario = decodedToken._id;
  const infPedido = await readPedidoID(idPedido);

  if (!infPedido) {
    throw new Error("Pedido no fue encontrado");
  }
  if (_.toString(infPedido.idUsuario) !== idUsuario) {
    throw new Error("No tienes permitido eliminar el pedido");
  }
  const eliminacion = await deletePedidoMongo(idPedido);
  return eliminacion;
}

module.exports = { 
  readPedidoID,
  readPedidos,
  createPedido,
  updatePedido,
  deletePedido
 };