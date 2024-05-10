const express = require("express");
const router = express.Router();
const { ingreso } = require("../Controllers/Auth");

async function ingreso(req, res) {
    try {
        const users = await login(req.body);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

router.post("/", ingreso);

module.exports = router;