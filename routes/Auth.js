const express = require("express");
const router = express.Router();
const { ingreso } = require("../Controllers/Auth");

async function ingresos(req, res) {
  try {
    const users = await ingreso(req.body);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

router.post("/", ingresos);

module.exports = router;
