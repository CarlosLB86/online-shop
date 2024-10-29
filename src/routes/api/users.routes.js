const router = require('express').Router();

const { checkToken } = require('../../../utils/middlewares');
const { register, login, addProductCart, getProfile } = require('../../controllers/api_controllers/users.controller');

router.get('/profile', checkToken, getProfile);
router.post('/register', register);
router.post('/login', login);
router.put('/add/:productId', checkToken, addProductCart);

module.exports = router;
