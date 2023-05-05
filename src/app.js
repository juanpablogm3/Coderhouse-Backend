import express from 'express';
import {prodsRouter} from './routes/products.router.js';

const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', prodsRouter);

app.listen(port, () => {
console.log(`Example app listening on http://localhost:${port}`)
})

app.get('*',(req, res)=>{
    return res.status(404).json({
        status: 'error',
        msg: 'no está implementada la ruta',
        data: {}
    });
});
