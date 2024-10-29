# API Products

## Creación de un producto

URL: /api/products
MÉTODO: POST
HEADERS: X
BODY: name, description, department, price, stock, available

Respuesta:
- El nuevo producto creado

¿Qué podemos probar?
- Que la URL funcione: status => 201 y Content-Type: application/json
- Comprobar que en la respuesta tenemos el _id
- Comprobar que los campos que enviamos en el body son los que se guardan en el documento de la BD

## Actualización de producto

URL: /api/products/<PRODUCTID>
MÉTODO: PUT
HEADERS: X
BODY: aquellos campos que necesitemos modificar

Respuesta:
- El producto actualizado

¿Qué puedo probar?
- Que la URL funcione: status -> 201 y Content-Type: application/json
- Los valores que modificamos se cambian en la BD

¡¡Cuidado!!
- Antes de empezar las pruebas, creamos un nuevo producto
- Con la prueba modificamos ese producto
- Cuando terminen las pruebas, borramos dicho producto

## Borrado de un producto

URL: /api/products/<PRODUCTID>
MÉTODO: DELETE
HEADERS: X
BODY: X

Respuesta:
- El producto borrado

## Más rutas

- GET /api/products/<PRODUCTID> - Retorna un producto a partir de su id
findById


- GET /api/products/dpt/<Dpartment> - Retornar todos los productos de un departamento
- GET/api/products/available - Retorna todos los productos disponibles y con stock mayor de 10
- GET /api/products/price?min=<MINPRICE>&max=<MAXPRICE> - Retorna los productos en un rango de precio
1. Método en controlador y ruta
2. min y max lo extramos de req.query
3. Prueba:
        GET {{host}}/api/products/price?min=100&max=400


# API USERS

 Crear modelo User

## Registro
POST: /api/users/register
Body: username, email, password
## Login
POST: /api/users/login
Body: email, password

## Añadir producto al carrito
PUT /api/users/add/<PRODUCTID>

## Obtener el perfil del usuario
GET /api/users/profile