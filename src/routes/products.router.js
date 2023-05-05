import express from 'express';
import ProductManager from '../productManager.js';

export const prodsRouter= express.Router();
const productManager = new ProductManager("./src/data/products.json");

prodsRouter.get("/:pid", async (req, res)=> {
    const idProd = parseInt(req.params.pid);
    const reqProd = await productManager.getProductById(idProd);
    return res.json(reqProd)
})

prodsRouter.get("/", async (req, res)=> {
    const limit = parseInt(req.query.limit);
    const allProducts = await productManager.getProducts();
    if (!limit){
        return res.status(200).json({
            status: 'success',
            msg: 'Listado de productos',
            data: allProducts
        });
    }  else {
        return res.status(200).json({
            status: 'success',
            msg: 'Listado de productos',
            data: allProducts.slice(0, limit)
        });
    } 
});

prodsRouter.post("/", async (req, res)=> {
    try{
        const newProduct = req.body;
        const addProductResult = await productManager.addProduct(newProduct);
        if(typeof addProductResult == "object"){
            return res.status(201).json({
                status: 'success',
                msg: 'Producto creado',
                data: addProductResult
            });
        } else {
            return res.status(400).json({
              status: 'error',
              msg: addProductResult,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'error',
            msg: error.message,
        });
    }
});

prodsRouter.put("/:pid", async (req, res)=>{
    try{
        const idProd = parseInt(req.params.pid);
        const updateProdResult = await productManager.updateProduct(idProd, req.body.field, req.body.newValue);
        if(typeof updateProdResult == "object"){
            return res.status(200).json({
                status: 'success',
                msg: 'Producto modificado',
                data: updateProdResult
            });
        } else {
            return res.status(400).json({
              status: 'error',
              msg: updateProdResult,
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'error',
            msg: error.message,
        });
    }
});