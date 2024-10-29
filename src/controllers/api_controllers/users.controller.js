const bcrypt = require('bcryptjs');
const User = require('../../models/users.model');
const { createToken } = require('../../../utils/helpers');

const register = async (req, res, next) => {
    try {
        // Encriptamos la password
        req.body.password = await bcrypt.hash(req.body.password, 8);
        // Insertamos el documento
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }

}
const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: ' Error en email y/o contraseña' });
    }
    const same = await bcrypt.compare(password, user.password);
    if (!same) {
        return res.status(401).json({ message: ' Error en email y/o contraseña' });
    }
    res.json({ message: '¡¡¡Login correcto!!!', token: createToken(user) });
}

const addProductCart = async (req, res, next) => {
    const { productId } = req.params;
    try {
        req.user.cart.push(productId);
        await req.user.save();
        res.json(req.user);
    } catch (error) {
        next(error);
    }
}

const getProfile = async (req, res, next) => {
    res.json(req.user);
}
module.exports = {
    register, login, addProductCart, getProfile
}