const { response } = require("express");
const Categoria = require("../models/categoria");


const obtenerCategorias = async(req, res = response) => {

    const categorias = await Categoria.find().populate('usuario', 'email');

    res.json(categorias)

}


const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    /* comprueba si la categoría ya existe */
    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        })
    }



    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);

}


const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    await Categoria.findByIdAndUpdate(id, { nombre });

    res.json({
        msg: 'La categoría se actualizó correctamente'
    });

}

const eliminarCategoria = async(req, res = response) => {

    const { id } = req.params;
    await Categoria.findByIdAndDelete(id);

    res.json({
        msg: 'La categoría se eliminó correctamente'
    })

}


module.exports = {
    actualizarCategoria,
    crearCategoria,
    eliminarCategoria,
    obtenerCategorias
}