const { Schema, model } = require('mongoose');

const CategoriaSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], unique: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
})


CategoriaSchema.methods.toJson = function() {
    const { __v, ...categoria } = this.toObject();
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);