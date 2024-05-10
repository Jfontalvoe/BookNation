const obtenerUsuario = require("../Actions/Auth");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
 dotenv.config();

async function ingreso(data) {
  const validation = await obtenerUsuario(data.correo);
  if (
    validation.correo === data.correo &&
    (await passValidate(data.password, validation.password))
  ) {

    const token = jwt.sign({ _id: validation._id, correo: data.correo, cedula: validation.cedula}, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return { token: token, correo: data.correo, cedula: validation.cedula, _id: validation._id };
  } else {
    throw new Error("Usuario o contraseña incorrectos");
  }
}
async function passValidate(pass, hash) {
  return await argon2.verify(hash, pass);
}


module.exports = {ingreso}