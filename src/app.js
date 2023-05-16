import express from 'express';
import { prodsRouter } from './routes/products-router.js';
import { cartsRouter } from './routes/carts-router.js';
import viewsRouter from './routes/views-router.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import ProductManager from './productManager.js';

const productManager = new ProductManager('./data/products.json');
const port = 8080;
const app = express();

const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);


//BACK EMITE


//BACK RECIBE
io.on('conection', (socket)=> {
    socket.on('msg_from_client_to_server', async (newProduct)=>{
        try{
            await productManager.addProduct({newProduct})
            const productsList = await productManager.getProducts();
            io.emit("msg_from_server_to_client", {productsList})
        }
        catch (error) {
            console.log(error);
        }
    })
})

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

//middlewares
app.use(express.static(__dirname+'/public'));
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/products', prodsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter); 
app.use('/realTimeProducts', viewsRouter); 
app.get('*',(req, res)=>{
    return res.status(404).json({
        status: 'error',
        msg: 'Route not found'
    });
});
