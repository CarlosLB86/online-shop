const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Product = require('../models/products.model');
describe('Api de productos', () => {

    beforeAll(async () => {
        // Conexión a la base de datos
        await mongoose.connect('mongodb://127.0.0.1:27017/online-shop');
    });
    afterAll(async () => {
        // Desconexión de la base de datos
        await mongoose.disconnect();

        describe('GET /api/products', () => {

        });

        let response;  // el beforeall hace que se ejecuten antes las funciones que las pruebas
        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
        });

        it('debería responder con status 200', () => {
            expect(response.statusCode).toBe(200);
        });

        it('debería responder con un JSON', () => {  // la cabecera espera que el contenido del header sea un application/json
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('debería responder con un array', () => {  // tobeinstanceof es para un tipo concreto de objetos
            expect(response.body).toBeInstanceOf(Array)


        });

        describe(' POST /api/products', () => {

            let response;
            const body = { name: 'Lapiz verde', description: 'pinta en verde', department: 'test', price: 14, stock: 200, available: true };
            beforeAll(async () =>  // esto es lo primero en ejecutarse
                response = await request(app).post('/api/products')).send();
        });
        afterAll(async () => {  // esto lanza un script que se ejecuta lo ultimo y borra los productos del department test
            // Borrar los productos con department test
            await Product.deleteMany({ department: 'test' });
        });
        it('deberia funcionar la URL', () => {  // esto es lo segundo en ejecutarse
            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toContain('application/json');

        });
        it('deberia devolver un _id correcto', () => {  // esto es lo tercero en ejecutarse
            expect(response.body._id).toBeDefined();
        });

        it('los valores enviados son los mismos que se guardan', () => {
            expect(response.body.name).toBe(body.name);
            expect(response.body.description).toBe(body.description);
            expect(response.body.department).toBe(body.department);
            expect(response.body.price).toBe(body.price);
            expect(response.body.stock).toBe(body.stock);
            expect(response.body.available).toBe(body.available);
        });
        describe('PUT /api/products/<PRODUCTID>', () => {

            let product;
            let response;
            beforeAll(async () => {
                // 1. Crear el producto que vamos a actualizar
                product = await Product.create(body);


                // 2. Lanzar la petición PUT sobre el producto anterior
                response = request(app)
                    .put(`/api/products/${product._id}`)
                    .send({
                        price: 30, stock: 300
                    });
            });

            afterAll(async () => {
                // Borrar el producto creado para las pruebas
                await Product.findByIdAndDelete(product._id);
            });

            it('deberia funcionar la URL', () => {
                expect(response.statusCode).toBe(200);
                expect(response.headers['content-type']).toContain('application/json');
            });
            it('debería tener los campos actualizados en la BD', () => {
                expect(response.body.price).toBe(30);
                expect(response.body.price).toBe(300);
            });

            describe('DELETE /api/products/<PRODUCTID>', () => {

                let product;
                let response;
                const body = { name: 'Lápiz verde', description: 'Pinta en verde', department: 'test', price: 14, stock: 200, available: true };
                beforeAll(async () => {
                    // 1. Crear el producto que vamos a borrar
                    product = await Product.create(body);

                    // 2. Lanzamos la petición
                    response = await request(app)
                        .delete(`/api/products/${product._id}`)
                        .send();
                });

                afterAll(async () => {
                    // Borrar el producto creado para las pruebas
                    await Product.findByIdAndDelete(product._id);
                });

                it('debería funcionar la URL', () => {
                    expect(response.statusCode).toBe(200);
                    expect(response.headers['content-type']).toContain('application/json');
                });

                it('el producto no debería existir en la BD', async () => {
                    const productDeleted = await Product.findById(product._id);
                    expect(productDeleted).toBeNull();
                });

            });
        });

    })
}); 