const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarInputs } = require('../middlewares/validar-inputs');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto, obtenerProductoCategoria } = require('../controllers/producto');
const { productoExiste, categoriaExiste } = require('../helpers/db-validators');

const router = Router();

/* obtener todos los productos */
router.get('/', obtenerProductos);

/* obtener un producto */
router.get('/:id', [
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(productoExiste),
    validarInputs
], obtenerProducto)

/* obtener producto por categoria */
router.get('/categoria/:id', [
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(categoriaExiste),
    validarInputs
], obtenerProductoCategoria)


/* crear un nuevo producto */
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'El nombre es obligatorio').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('categoria', 'Ingrese una categoria válida').isMongoId(),
    check('categoria').custom(categoriaExiste),
    validarInputs
], crearProducto);

/* actualiza un producto */
router.put('/:id', [
    validarJWT,
    check('id', 'Ingrese una id válida').isMongoId(),
    check('id').custom(productoExiste),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'El nombre es obligatorio').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('categoria', 'Ingrese una categoria válida').isMongoId(),
    check('categoria').custom(categoriaExiste),
    validarInputs
], actualizarProducto)

/* elimina un producto */
router.delete('/:id', [
    validarJWT,
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(productoExiste),
    // TODO: verify if category is already removed
    validarInputs
], eliminarProducto)

module.exports = router;