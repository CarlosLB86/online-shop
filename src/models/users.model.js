const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'regular'
    },
    cart: [{ type: Schema.Types.ObjectId, ref: 'product' }]
}, { timestamps: true, versionKey: false });


const User = model('user', userSchema); // creacion del esquema llamado user y meter la informacion de userSchema en el esquema llamado user