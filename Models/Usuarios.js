const mongoose = require("mongoose");
const argon2 = require("argon2");

const usuariosSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    cedula: { type: String, required: true, unique: true },
    correo: { type: String, required: true , unique: true},
    password: { type: String, required: true },
    direccion: { type: String, required: true },
    activo: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

usuariosSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

const Usuario = mongoose.model("Usuario", usuariosSchema);

module.exports = Usuario;