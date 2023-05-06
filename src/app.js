import express from 'express';
import {prodsRouter} from './routes/products-router.js';
import {cartsRouter} from './routes/carts-router.js';

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', prodsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
console.log(`Example app listening on http://localhost:${port}`)
})

app.get('*',(req, res)=>{
    return res.status(404).json({
        status: 'error',
        msg: 'Route not found'
    });
});
/* app.get("/products/:pid", async (req, res)=> {
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
}) */

