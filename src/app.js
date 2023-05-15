import express from 'express';
import { prodsRouter } from './routes/products-router.js';
import { cartsRouter } from './routes/carts-router.js';
import { viewsRouter } from './routes/views-router.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';


const port = 8080;
const app = express();

const socketServer = new Server(httpServer);
const httpServer = app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
  

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', prodsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter); 
//app.use(express.static(__dirname+'/public'));
app.use(express.static('/public'));

app.listen(port, () => {
console.log(`Example app listening on http://localhost:${port}`)
})

app.get('*',(req, res)=>{
    return res.status(404).json({
        status: 'error',
        msg: 'Route not found'
    });
});
