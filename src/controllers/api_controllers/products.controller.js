const e = require('express');
const Product = require('../../models/products.model')
const getAll = async (req, res, next) => {
    try {
        const products = await Product.find().populate('owner', 'username email');
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req, res, next) => {
    // req.user, previo a la creacion, arriba del req.body, le dices quien es el owner
    try {
        req.body.owner = req.user._id;
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(
            productId, req.body, { new: true });
        res.json(product);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByIdAndDelete(productId);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

const getByDepartment = async (req, res, next) => {
    const { department } = req.params;

    try {
        const products = await Product.find({ department: department });
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const getAvailable = async (req, res, next) => {
    try {
        const products = await Product.find({
            available: true,
            stock: { $gte: 10 }
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const getByPrice = async (req, res, next) => {
    const { min, max } = req.query;
    try {
        const products = await Product.find({
            price: {
                $gte: min,
                $lte: max
            }
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll, createProduct, updateProduct, deleteProduct, getById, getByDepartment, getAvailable, getByPrice
}