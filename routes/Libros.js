const express = require("express");
const router = express.Router();
const { 
    readLibroID, 
    readLibros, 
    createLibro,
    updateLibro,
    removeLibro  } = require("../Controllers/Libros");

async function getLibroID(req, res) {

  try {
    const libro = await readLibroID(req.params.id);
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }

}

async function getLibros(req, res) {

  try {
    const libros = await readLibros(req.query);
    res.status(200).json({ libros });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }

}

async function postLibros(req, res) {

  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const libro = await createLibro(req.body, token);

    if (libro.modifiedCount === 0) {
      throw new Error("No fue posible crear el libro");
    }
    res.status(200).json({ mensaje: "Se ha creado el libro exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }

}

async function patchLibros(req, res) {

  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const libro = await updateLibro(req.body, token);

    if (libro.modifiedCount === 0) {
      throw new Error("No fue posible actualizar el libro");
    }
    res.status(200).json({ mensaje: "Se ha actualizado con exito" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }

}

async function deleteLibros(req, res) {

  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const libro = await removeLibro(req.params.id, token);

    if (libro.modifiedCount === 0) {
      throw new Error("No se pudo eliminar el libro");
    }
    res.status(200).json({ mensaje: "Se ha eliminado con exito" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }

}

router.get("/:id", getLibroID);
router.get("/", getLibros);
router.post("/", postLibros);
router.patch("/:id", patchLibros);
router.delete("/:id", deleteLibros);

module.exports = router;