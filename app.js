import express from 'express';
import fs from 'fs';

// definimos el puerto y el express
const port = 8080;
const app = express();

// Definiendo la función para numero aleatorio
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Inicializar el servidor
const server = app.listen(port, () => console.log('Server Up on port', port));

//Atrapando el error del servidor
server.on('error', (err) => {
  console.log('ERROR =>', err);
});

//Contador de visitas
let visits = 0;

//Leemos nuestro archivo de Productos, debe existir el archivo de lo contrario no se tiene control del error
let products = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'));

//Creamos el objeto que se enviá a /items
//{ items: [productos], cantidad: (cantidad productos) }
const items = { items: [], cantidad: 0 };
for (const product of products) {
  items.items.push(product.title);
}
items.cantidad = products.length;

//Punto 1 devolver el listado de Productos y la cantidad
app.get('/items', (request, response) => {
  visits++;
  response.json({
    msg: items,
  });
});

//Punto 2 devolver un elemento aleatorio
app.get('/item-random', (request, response) => {
  visits++;
  let index = random(0, products.length - 1);
  let product = products[index];
  let item = { item: product };
  response.json({
    msg: item,
  });
});

//Punto 3 devolver la cantidad de visitas de todas los get realizados.
app.get('/visitas', (request, response) => {
  visits++;
  response.json({
    msg: `Esta es la visita numero ${visits}`,
  });
});
