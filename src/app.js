import express from "express";
import productManager from "productManager.js";

const app = express()
const port = 3000
const prodManager = new productManager("../data/products.json")


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

app.get("/products/:pid", (req, res)=> {
    const idProd = req.params.pid;
    res.json(
        prodManager.getProductById(idProd)
    )
})

app.get("/products", (req, res)=> {
    const limit = req.query.limit;
    if (limit){
        const allProducts = prodManager.getProducts();
        res.json(allProducts.slice(0,limit));
    } else {
        re.json(prodManager.getProducts());
    }
})

// prueba github