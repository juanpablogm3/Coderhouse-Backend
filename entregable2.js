const fs = require('fs');

class ProductManager{
    constructor(path){
        this.path = path;
        this.products=[];
    }
            
    addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock){
        try{
            const prodsStr = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(prodsStr);
        } catch(err){
            console.log(`El archivo no existe, pero se va a crear`);
        }
        
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
        fs.writeFileSync(this.path, prodStr);
        return 'Producto agregado con éxito';
    };

    getProducts(){
        try{
            const prodsStr = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(prodsStr);
            return this.products;
        } catch(err){
            console.log(`El archivo no existe, ${err}`);
        }
    };


    getProductById(id) {
        try{
            const prodsStr = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(prodsStr);
            const productById = this.products.find((elem) => elem.id === id);
            if (!productById) {
                return `Producto con id ${id} no existe`;
            }
            return productById;
        } catch(err){
            console.log(err);
        }
    };
    
    updateProduct(id, field, newValue){
        try{
            const prodsStr = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(prodsStr);
            const indexToUpdate = this.products.findIndex(elem => elem.id === id);
            if (indexToUpdate===-1){
                return `No existe un producto con id ${id}`;
            }
            if(field!==("title" || "description" || "price" || "thumbnail" || "code" || "stock")){
                return `Error en el campo a modificar: ${field}`;
            }
            this.products[indexToUpdate][field] = newValue;
            const prodStr = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, prodStr);
            return `Producto actualizado con éxito`;
        } catch(err){
            console.log(`Error en update ${err}`);
        }
    }

    deleteProduct(id){
        try{
            const prodsStr = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(prodsStr);
            const filteredProds = this.products.filter((elem)=> elem.id !== id )
            if (filteredProds.length === this.products.length){
                return `No extiste producto con id ${id}`;
            }
            this.products = filteredProds;
            const prodStr = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, prodStr);
            return `Producto con id ${id} eliminado con éxito`;
        }catch(err){
            console.log(`Elproducto no existe: ${err}`);
        }
    }
        
};

// *********** TESTING **************

const productManager = new ProductManager("productos.json");
console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba1","Este es un producto prueba",200,"sin imagen","abc123",25));
console.log(productManager.addProduct("Este es un producto prueba",200,"sin imagen","abc1234",25)); // PRODUCTO SIN UN CAMPO
console.log(productManager.addProduct("producto prueba2","Este es un producto prueba",200,"sin imagen","abc1234",25)); 
console.log(productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25)); // PRODUCTO CON CODIGO REPETIDO
console.log(productManager.deleteProduct(1));
console.log(productManager.deleteProduct(5)); // PRODUCTO NO EXISTE
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2)); // ID INEXISTENTE (BORRADO)
console.log(productManager.updateProduct(1,"title","super zapatilla"));
console.log(productManager.updateProduct(1,"prize",1000)); // CAMPO MAL INGRESADO
console.log(productManager.updateProduct(5,"price",1000)); // ID NO EXISTE
console.log(productManager.addProduct("producto prueba2","Este es un producto prueba",200,"sin imagen","abc123456",25)); 
console.log(productManager.getProducts());

