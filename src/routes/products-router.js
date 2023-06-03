import express from 'express';
import { ProductModel } from '../dao/models/products.model.js';

/* import ProductManager from '../dao/productManager.js';
const productManager = new ProductManager("./src/data/products.json"); */

export const prodsRouter= express.Router();

prodsRouter.get("/", async (req, res)=> {
    try{
        const prods = await ProductModel.find({});
        return res.status(200).json({
            status: 'success',
            msg: 'Product list',
            data: prods
        });
    } catch (err) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong",
            data: err
        });
    }
});

prodsRouter.get("/:pid", async (req, res)=> {
    try{
        const idProd = req.params.pid;
        const getProdByIdResult = await ProductModel.findById(idProd);
        return res.status(200).json({
            status: 'success',
            msg: 'Product found',
            data: getProdByIdResult
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'error',
            msg: err
        });
    }
})


prodsRouter.post("/", async (req, res)=> {
    try{
        const {title, description, price, thumbnail, code, stock, category } = req.body;
        if (!title || !description || !price|| !thumbnail|| !code|| !stock|| !category) {
            console.log(
              "validation error: please complete title, description, price, thumbnail, code, stock, category."
            );
            return res.status(400).json({
              status: "error",
              msg: "please complete title, description, price, thumbnail, code, stock, category",
              data: {},
            });
        }
        const addProductResult = await ProductModel.create({title, description, price, thumbnail, code, stock, category});
        return res.status(201).json({
            status: 'success',
            msg: 'Product created',
            data: addProductResult
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            msg: err 
        });
    }
});

prodsRouter.put("/:pid", async (req, res)=>{
    try{
        const idProd = req.params.pid;
        const {title, description, price, thumbnail, code, stock, category } = req.body; 
        if (!title || !description || !price|| !thumbnail|| !code|| !stock|| !category|| !idProd ) {
            console.log(
                "validation error: please complete title, description, price, thumbnail, code, stock, category."
                );
            return res.status(400).json({
                status: "error",
                msg: "please complete title, description, price, thumbnail, code, stock, category",
                data: {},
            });
        }
        const updateProdResult = await ProductModel.updateOne(
            {_id: idProd},
            { title, description, price, thumbnail, code, stock, category }
        );
        return res.status(200).json({
            status: 'success',
            msg: 'Product updated',
            data: {}
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            status: 'error',
            msg: err
        });
    }
});

prodsRouter.delete("/:pid", async (req, res)=>{
    try{
        const idProd = req.params.pid;
        const deleteProductResult = await ProductModel.deleteOne({_id: idProd});
        return res.status(200).json({
                status: 'success',
                msg: 'Product deleted',
                data: {}
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            msg: "Oops... unexpected error found!"
        });
    }
})