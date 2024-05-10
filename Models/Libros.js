const mongoose = require('mongoose')

const librosSchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    nombre: { type: String, required: true},
    precio: { type: mongoose.Types.Decimal128, required: true },
    genero: { type: String, required: true},
    fechaPublicacion: { type: Date, required: true },
    editorial: { type: String, required: true },
    autor: { type: String, required: true},
    activo: { type: Boolean, default: true },
    /* pedidos: [{
      idPedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }
    }] */
}, {
  versionKey: false,
  timestamps: true
});

const Libro = mongoose.model('Libro', librosSchema);

module.exports = Libro;
