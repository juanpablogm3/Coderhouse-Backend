import express from 'express';
import { productsRouter } from './routes/products.router.js';
import { chatService } from './services/chat.service.js';
import { cartsRouter } from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { __dirname, __dirnameBase, __filename, connectMongo } from './utils.js';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import {productService} from './services/products.service.js';
import {productsController} from './controllers/products.controller.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { authRouter } from './routes/auth.router.js';
import { usersRouter } from './routes/users.router.js';
import { iniPassport } from './config/passport.config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import config from "./config/environmentConfig.js"
import errorHandler from "./middlewares/error.js"
import {logger} from "./logger.js"
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { mailerRouter } from '../src/routes/mailer.router.js'


await connectMongo();

const port = 8080;
const app = express();

//Websockets
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);
const serverConnected = httpServer.listen(port, ()=> logger.info(`Server listening on port: ${port}`));
serverConnected.on('error', error => console.log(`Server error: ${error}`))
io.on('connection', (socket)=> {
    console.log(`New Client Connection with ID: ${socket.id}`);
    //BACK RECIBE
    socket.on('msg_from_client_to_server', async (newProduct)=>{
        try{
            const user = await productsController.createOwnerForProduct();
            newProduct.owner = user;
            await productService.createProduct(newProduct);
            const productList = await productService.getAllProducts();
            //BACK EMITE
            io.emit("updatedProducts", {productList})
        }
        catch (error) {
            console.log(error);
        }
    })
    socket.on('deleteProduct', async (id) => {
        try {
            await productService.deleteProduct(id);
            socket.emit('productDeleted', { message: 'Producto eliminado exitosamente' });
            const productList = await productService.getAllProducts();
            io.emit('updatedProducts', { productList });
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            socket.emit('productDeleteError', { error: 'Ocurrió un error al eliminar el producto' });
        }
    });
    socket.on('new-message', async (data) => {
        try {
          const newMessage = await chatService.addMessage(data);
          const allMsgs = await chatService.getAllMessages();
  
          io.emit('chat-message', allMsgs);
        } catch (error) {
          console.log(error);
        }
    });
});

//Swagger
const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Coderhouse backend documentation project',
            description: 'Documentation of carts and products endpoints',
        },
    },
    apis: [`${__dirnameBase}/docs/**/*.yaml`]
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'views');//****************************************************se sacó la barra antes de dirname+'view' */
app.set('view engine', 'handlebars');

//Config EXPRESS
app.use(express.static(__dirname+'/public'));
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({ mongoUrl: `${process.env.mongo_string}`, ttl: 7200 }),
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', viewsRouter); 
app.use('/products', viewsRouter);
app.use('/mockingproducts', viewsRouter);
app.use('/realTimeProducts', viewsRouter); 
app.use('/chat', viewsRouter);
app.use('/carts/:cid', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/carts/:cid', cartsRouter);
app.use('/api/carts/:cid/products/:pid', cartsRouter);
app.use('/api/carts/:cid/purchase', cartsRouter);
app.use('/auth', authRouter);
app.use('/loggertest', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/mailer', mailerRouter);
app.get('*',(req, res)=>{
    return res.status(404).json({
        status: 'error',
        msg: 'Route not found'
    });
});
app.use(errorHandler);