const fs = require('fs');

class ProductManager{

    verifyFile = () => {
        try{
            const prodsStr = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(prodsStr);
        } catch(err){
            console.error(`El archivo ${this.path} no existe`);
        }
    }
    constructor(path){
        this.path = path;
        this.products=[];
        this.verifyFile();
        const prodsStr = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, prodsStr);
    }
            
    addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock){
        const newProduct={
            title: newTitle,
            description: newDescription,
            price: newPrice,
            thumbnail: newThumbnail,
            code: newCode,
            stock: newStock
        };
        
        
        const existingProduct = this.products.find((p) => p.code === newCode);
        if(existingProduct){
            return `El producto con código ${newCode} ya existe`;
        };
        if(!newTitle || !newDescription || !newPrice || !newThumbnail || !newCode || !newStock){
            return 'Se deben completar todos los campos';
        };
        
        const id = this.products.length + 1;
        newProduct.id = id;
        this.products.push(newProduct)
        const prodStr = JSON.stringify(this.products, null, 2);
        if(!this.verifyFile()){
            fs.appendFileSync(this.path, prodStr);
        }
        //fs.appendFileSync(this.path, prodStr);
        return 'Producto agregado con éxito';

    };

    getProducts(){
        this.verifyFile();
        return this.products;
    };


    getProductById(id) {
        this.verifyFile();
        const productById = this.products.find((elem) => elem.id === id);
        if (!productById) {
            return `Producto con id ${id} no existe`;
        }
        return productById;
    };
    
    updateProduct(id, field, value){

    }

    deleteProduct(id){
        try{
            const prodsStr = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(prodsStr);
        }catch(err){
            
        }
    }
};

// *********** TESTING **************
const productManager = new ProductManager("productitos.json");
console.log(productManager.verifyFile());
//console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba1","Este es un producto prueba",200,"sin imagen","abc123",25));
//console.log(productManager.addProduct("Este es un producto prueba",200,"sin imagen","abc1234",25)); // PRODUCTO SIN UN CAMPO
//console.log(productManager.addProduct("producto prueba2","Este es un producto prueba",200,"sin imagen","abc1234",25)); 
//console.log(productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25)); // PRODUCTO CON CODIGO REPETIDO
console.log(productManager.getProducts());
/* console.log(productManager.getProductById(1));
console.log(productManager.getProductById(66)); */ // ID INEXISTENTE

/* const myProductManager = new ProductManager("productazos.json");

console.log(myProductManager.getProducts());
console.log(myProductManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25));
console.log(myProductManager.addProduct("Este es un producto prueba",200,"sin imagen","abc1234",25)); // PRODUCTO SIN UN CAMPO
console.log(myProductManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc1234",25)); 
console.log(myProductManager.getProducts());
console.log(myProductManager.getProductById(1));
console.log(myProductManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25)); // PRODUCTO CON CODIGO REPETIDO
console.log(myProductManager.getProductById(66)); // ID INEXISTENTE */