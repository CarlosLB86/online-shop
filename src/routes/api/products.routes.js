//BASE URL: /api/products
const router = require('express').Router();


const { checkToken } = require('../../../utils/middlewares');
const { getAll, createProduct, updateProduct, deleteProduct, getById, getByDepartment, getAvailable, getByPrice } = require('../../controllers/api_controllers/products.controller');


router.get('/', getAll);
router.get('/available', getAvailable);
router.get('/dpt/:department', getByDepartment);
router.get('/price', getByPrice);
router.get('/:productId', getById);
router.post('/', checkToken, createProduct);
router.put('/:productId', checkToken, updateProduct);
router.delete('/:productId', checkToken, deleteProduct);


module.exports = router;