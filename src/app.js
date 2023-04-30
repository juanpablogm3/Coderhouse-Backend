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
    if(typeof reqProd !== 'object'){
        return res
            .status(400)
            .json({error: 'Id not found'})
    }
    return res
        .status(200)
        .json(reqProd)
})

app.get("/products", async (req, res)=> {
    const limit = parseInt(req.query.limit);
    const allProducts = await productManager.getProducts();
    if (!limit){
        return res
            .status(200)
            .json(allProducts);
    } else {
        return res
            .status(200)
            .json(allProducts.slice(0,limit));
    }
})

app.put("/products/:pid", async (req, res)=> {
    const idProd = parseInt(req.params.pid);
    const { field, newValue } = req.body;
    await productManager.updateProduct(idProd, field, newValue);
    return res
        .status(200)
        .json({Message: "Product updated"})
})

app.delete("/products/:pid", async (req, res)=> {
    const idProd = parseInt(req.params.pid);
    await productManager.deleteProduct(idProd);
    return res
        .status(200)
        .json({message: 'Product deleted'})
})

app.post("/products", async (req, res)=> {
    productManager.addProduct(req.body);
    return res
        .status(201)
        .json({message: "Product created!"})
})

