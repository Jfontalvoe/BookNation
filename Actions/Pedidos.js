const Pedido = require("../Models/Pedidos");

async function readPedidoIDMongo(data) {
  const pedido = await Pedido.findOne({ _id: data }).lean();
  return pedido;
}

async function readPedidosMongo() {
  const pedidos = await Pedido.find();
  return pedidos;
}

async function createPedidoMongo(idUsuario, valor, libros) {
  const librosFormato = libros.map((libro) => ({ idLibro: libro }));

  const pedidoCreado = await Pedido.create({
    idUsuario: idUsuario,
    total: valor,
    libros: librosFormato,
  });
  return pedidoCreado;
}

async function updatePedidoMongo(idPedido, data) {
  const pedidoActual = await Pedido.updateOne(
    { _id: idPedido },
    { $set: data }
  );
  return pedidoActual;
}

async function deletePedidoMongo(idPedido) {
  const pedidoEliminado = await Pedido.updateOne(
    { _id: idPedido },
    { activo: false }
  );
  return pedidoEliminado;
}

module.exports = {
  readPedidoIDMongo,
  readPedidosMongo,
  createPedidoMongo,
  updatePedidoMongo,
  deletePedidoMongo,
};
