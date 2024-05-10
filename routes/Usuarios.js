const express = require("express");
const router = express.Router();


const {
    readUsuarioID,
    readUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} = require("../Controllers/Usuarios");

async function getUsuarioID(req, res) {

  try {
    const usuario = await readUsuarioID(req.params.id);
    res.status(200).json({...usuario});
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }

}

async function getUsuarios(req, res) {

  try {
    const usuarios = await readUsuarios();
    res.status(200).json({...usuarios});
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }

}

async function postUsuarios(req, res) {

  try {
    const usuarios = await createUsuario(req.body);
    if (usuarios.modifiedCount === 0) {
        throw new Error("No se logró crear el usuario");
    }
    res.status(200).json({
      mensaje: "Se ha creado el usuario exitosamente",
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }

}

async function patchUsuarios(req, res) {

  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new Error("El token de autorización no fue proporcionado");
    }
    const usuarios = await updateUsuario(req.body, token);

    if (usuarios.modifiedCount === 0) {
      throw new Error("No se logró actualizar el usuario");
    }
    res.status(200).json({ mensaje: "Usuario actualizado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }

}

async function deleteUsuarios(req, res) {

  try {
    const idUsuario = req.params.id;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 
    if (!token) {
      throw new Error("El token de autorización no fue proporcionado");
    }

    if (!idUsuario) {
      throw new Error("ID de usuario no fue proporcionado");
    }
    const usuarios = await deleteUsuario(idUsuario, token);

    if (usuarios.modifiedCount === 0) {
        throw new Error("No se logró eliminar a el usuario");
    }
    res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });

  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }

}


router.get("/:id", getUsuarioID);
router.get("/", getUsuarios);
router.post("/", postUsuarios);
router.patch("/", patchUsuarios);
router.delete("/:id", deleteUsuarios);

module.exports = router;