const { Schema, model } = require('mongoose');
// Generación de una colección en mongodb
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    department: String,
    stock: Number,
    available: Boolean,
    owner: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true, versionKey: false
});

const Product = model('product', productSchema);

module.exports = Product;