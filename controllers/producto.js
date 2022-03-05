const { response } = require("express");
const Producto = require("../models/producto");

/* obtener todos los productos */
const obtenerProductos = async(req, res = response) => {

    const productos = await Producto.find().populate('usuario', 'email');

    res.json(productos)

}

/* obtener un producto */
const obtenerProducto = async(req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'email');

    res.json({
        producto
    })

}

/* crear producto */
const crearProducto = async(req, res = response) => {

    const { categoria, descripcion, imagen, nombre, precio } = req.body;

    const data = {
        categoria,
        descripcion,
        imagen,
        nombre,
        precio,
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);

}

/* actualiza un producto */
const actualizarProducto = async(req, res = response) => {

    const { id } = req.params;
    const { usuario, categoria, ...producto } = req.body;

    producto.usuario = req.usuario._id;

    await Producto.findByIdAndUpdate(id, producto);

    res.json({
        msg: 'El producto se actualizó correctamente'
    });

}

/* elimina un producto */
const eliminarProducto = async(req, res = response) => {

    const { id } = req.params;
    await Producto.findByIdAndDelete(id);

    res.json({
        msg: 'El producto se eliminó correctamente'
    })

}


module.exports = {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    obtenerProducto,
    obtenerProductos
}