const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarInputs } = require('../middlewares/validar-inputs');
const { categoriaExiste } = require('../helpers/db-validators');
const { obtenerCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categoria');


const router = Router();

/* obtener todas las categorias */
router.get('/', obtenerCategorias);

/* crear categoria */
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarInputs
], crearCategoria)

/* actualizar categoria */
router.put('/:id', [
    validarJWT,
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(categoriaExiste),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarInputs
], actualizarCategoria)

/* eliminar categoria */
router.delete('/:id', [
    validarJWT,
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(categoriaExiste),
    validarInputs
], eliminarCategoria)


module.exports = router;