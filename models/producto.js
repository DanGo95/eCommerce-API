const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    descripcion: { type: String, required: [true, 'La descripcion es obligatoria'] },
    imagen: { type: String, required: [true, 'La imagen es obligatoria'] },
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    precio: { type: Number, default: 0 },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
})


ProductoSchema.methods.toJSON = function() {
    const { __v, ...producto } = this.toObject();
    return producto;
}

module.exports = model('Producto', ProductoSchema);