import express from "express";
import ProductManager from './productManager.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;
const productManager = new ProductManager("products_old.json");

// *********** TESTING **************
/* async function test() {
    console.log(await productManager.getProducts()); // Sin estar creado el array de productos
    console.log(await productManager.addProduct("producto prueba1","Este es un producto prueba",200,"sin imagen","abc123",25)); // con ID 1
    console.log(await productManager.addProduct("Este es un producto prueba",200,"sin imagen","abc1234",25)); // PRODUCTO SIN UN CAMPO
    console.log(await productManager.addProduct("producto prueba2","Este es un producto prueba",200,"sin imagen","abc1234",25)); // con ID 2
    console.log(await productManager.addProduct("producto prueba3","Este es un producto prueba",200,"sin imagen","abc12345",25)); // con ID 3
    console.log(await productManager.addProduct("producto prueba4","Este es un producto prueba",200,"sin imagen","abc12346",25)); // con ID 4
    console.log(await productManager.addProduct("producto prueba5","Este es un producto prueba",200,"sin imagen","abc12347",25)); // con ID 5
    console.log(await productManager.addProduct("producto prueba6","Este es un producto prueba",200,"sin imagen","abc12348",25)); // con ID 6
    console.log(await productManager.addProduct("producto prueba7","Este es un producto prueba",200,"sin imagen","abc12349",25)); // con ID 7
    console.log(await productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25)); // PRODUCTO CON CODIGO REPETIDO
    console.log(await productManager.deleteProduct(2));
    console.log(await productManager.deleteProduct(22)); // PRODUCTO NO EXISTE
    console.log(await productManager.getProductById(1));
    console.log(await productManager.getProductById(22)); // ID INEXISTENTE
    console.log(await productManager.updateProduct(1,"title","super zapatilla"));
    console.log(await productManager.updateProduct(1,"prize",1000)); // CAMPO MAL INGRESADO
    console.log(await productManager.updateProduct(22,"price",1000)); // ID NO EXISTE
    console.log(await productManager.addProduct("producto prueba8","Este es un producto prueba",200,"sin imagen","abc123456",25)); // Para demostrar que usa ids mínimos disponibles
    console.log(await productManager.getProducts());
}
  
test(); */

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

app.get("/products/:pid", (req, res)=> {
    const idProd = req.params.pid;
    res.json(
        productManager.getProductById(idProd)
    )
})

app.get("/products", (req, res)=> {
    const limit = req.query.limit;
    if (limit){
        const allProducts = prodManager.getProducts();
        res.json(allProducts.slice(0,limit));
    } else {
        res.json(productManager.getProducts());
    }
})
