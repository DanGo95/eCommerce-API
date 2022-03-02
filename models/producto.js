const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    descripcion: { type: String },
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], unique: true },
    precio: { type: Number, default: 0 },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
})


ProductoSchema.methods.toJSON = function() {
    const { __v, ...producto } = this.toObject();
    return producto;
}

module.exports = model('Producto', ProductoSchema);