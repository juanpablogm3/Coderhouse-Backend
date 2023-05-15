import express from 'express';
import ProductManager from '../productManager.js';
import {uploader} from '../utils.js';

export const prodsRouter= express.Router();
const productManager = new ProductManager("./src/data/products.json");

prodsRouter.get("/:pid", async (req, res)=> {
    try{
        const idProd = parseInt(req.params.pid);
        const getProdByIdResult = await productManager.getProductById(idProd);
        if(typeof getProdByIdResult == "object"){
            return res.status(200).json({
                status: 'success',
                msg: 'Product found',
                data: getProdByIdResult
            })
        } else {
            return res.status(404).json({
                status: 'error',
                msg: `Product with id ${idProd} not found`,
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'error',
            msg: error.message,
        });
    }
})

prodsRouter.get("/", async (req, res)=> {
    const limit = parseInt(req.query.limit);
    const allProducts = await productManager.getProducts();
    if (!limit){
        return res.status(200).json({
            status: 'success',
            msg: 'Product list',
            data: allProducts
        });
    }  else {
        return res.status(200).json({
            status: 'success',
            msg: 'Product list',
            data: allProducts.slice(0, limit)
        });
    } 
});

prodsRouter.post("/", uploader.array('thumbnail'), async (req, res)=> {
    try{
        if(!req.files){
            req.status(400).json({
                status: "error",
                error: "Unable to upload images"
            })
        }
        const newProduct = req.body;
        const thumbnailPaths = req.files.map(file => file.path);
        newProduct.thumbnail = thumbnailPaths;
        const addProductResult = await productManager.addProduct(newProduct);
        if(typeof addProductResult == "object"){
            return res.status(201).json({
                status: 'success',
                msg: 'Product created',
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
                msg: 'Product updated',
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

prodsRouter.delete("/:pid", async (req, res)=>{
    try{
        const idProd = parseInt(req.params.pid);
        const deleteProductResult = await productManager.deleteProduct(idProd);
        if(typeof deleteProductResult == "object"){
            return res.status(200).json({
                status: 'success',
                msg: 'Product deleted',
            });
        } else {
            return res.status(404).json({
              status: 'error',
              msg: deleteProductResult,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'error',
            msg: error.message,
        });
    }
})