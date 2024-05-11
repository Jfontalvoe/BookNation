const express = require("express");
const router = express.Router();
const {
  readPedidoID,
  readPedidos,
  createPedido,
  updatePedido,
  deletePedido,
} = require("../Controllers/Pedidos");

async function getPedidoID(req, res) {
  try {
    const pedido = await readPedidoID(req.params.id);
    res.status(200).json({ ...pedido });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function getPedidos(req, res) {
  try {
    const pedidos = await readPedidos();
    res.status(200).json({ ...pedidos });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function postPedidos(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const pedidos = await createPedido(req.body, token);
    if (pedidos.modifiedCount === 0) {
      throw new Error("No fue posible crear el pedido");
    }
    res.status(200).json({
      mensaje: "Se ha creado el pedido exitosamente",
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function patchPedidos(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new Error("El token de autorización no fue proporcionado");
    }

    const pedidos = await updatePedido(req.params.id, req.body, token);
    if (!pedidos) {
      throw new Error("Por permisos, no se logró actualizar el pedido");
    }
    if (pedidos.modifiedCount === 0) {
      throw new Error("No se logró actualizar el pedido");
    }
    res.status(200).json({
      mensaje: "Pedido actualizado",
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function deletePedidos(req, res) {
  try {
    const idPedido = req.params.id;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new Error("Token de autenticación no proporcionado");
    }
    if (!idPedido) {
      throw new Error("ID del pedido no fue proporcionado");
    }
    const pedidos = await deletePedido(idPedido, token);
    if (pedidos.modifiedCount === 0) {
      throw new Error("No se logró eliminar el pedido");
    }
    res.status(200).json({ mensaje: "Pedido eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

router.get("/:id", getPedidoID);
router.get("/", getPedidos);
router.post("/", postPedidos);
router.patch("/:id", patchPedidos);
router.delete("/:id", deletePedidos);

module.exports = router;
