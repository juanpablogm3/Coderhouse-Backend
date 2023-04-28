import express from 'express';
import ProductManager from './productManager.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;
const productManager = new ProductManager("./src/data/products.json");

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

app.get("/products/:pid", async (req, res)=> {
    const idProd = parseInt(req.params.pid);
    const reqProd = await productManager.getProductById(idProd);
    return res.json(reqProd)
})

app.get("/products", async (req, res)=> {
    const limit = parseInt(req.query.limit);
    const allProducts = await productManager.getProducts();
    if (!limit){
        return res.json(allProducts);
    } else {
        return res.json(allProducts.slice(0,limit));
    }
})