const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");

/* valida si el email es único */
const emailExiste = async(email = '') => {
    const checkEmail = await Usuario.findOne({ email });

    if (checkEmail) {
        throw new Error('El email ya se encuentra registrado');
    }
};

/* valida si la categoria existe */
const categoriaExiste = async(id = '') => {
    const checkId = await Categoria.findById(id);

    if (!checkId) {
        throw new Error('La categoria no existe');
    }
}

/* valida si el producto existe */
const productoExiste = async(id = '') => {
    const checkId = await Producto.findById(id);

    if (!checkId) {
        throw new Error('El producto no existe');
    }
}



// /* valida si el usuario puede modificar el producto */
const mismoUsuario = async(id, { req }) => {
    const producto = await producto.findOne({
        $and: [{ _id: id }, { usuario: req.usuario.id }]
    });

    if (!producto) {
        throw new Error('No tiene permisos para modificar esta producto');
    }

}


module.exports = {
    categoriaExiste,
    emailExiste,
    productoExiste,
    mismoUsuario
}