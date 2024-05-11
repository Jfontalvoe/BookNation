const mongoose = require("mongoose");

const pedidosSchema = new mongoose.Schema(
  {
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    estado: {
      type: String,
      enum: ["en progreso", "completado", "cancelado"],
      default: "en progreso",
    },
    total: { type: mongoose.Types.Decimal128, required: true },
    libros: [
      {
        idLibro: { type: mongoose.Schema.Types.ObjectId, ref: "Libro" },
      },
    ],
    activo: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Pedido = mongoose.model("Pedido", pedidosSchema);

module.exports = Pedido;
