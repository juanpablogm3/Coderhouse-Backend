const fs = require('fs');

class ProductManager{
    constructor(path){
        this.path = path;
        this.products=[];
        this.idManager = 1;
    };

    readFile(){
        try{
            const prodsStr = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(prodsStr);
            //return this.products;
        } catch(err){
            console.log(`El archivo no existe: ${err}`);
        }
    };

    saveFile(){
        const prodStr = JSON.stringify(this.products, null, 2);
        try{
            fs.writeFileSync(this.path, prodStr);
            return 'Guardado con éxito';
        } catch(err) {
            Console.log(`Error al escribir el archivo: ${err}`)
        }
    };
            
    addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock){
        
        this.readFile();
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
        newProduct.id = this.idManager;
        this.products.push(newProduct);
        this.idManager++;
    };

    getProducts(){
        this.readFile();
    };


    getProductById(id) {
        try{
           this.readFile();
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
            this.readFile();
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
            this.readFile();
            const filteredProds = this.products.filter((elem)=> elem.id !== id )
            if (filteredProds.length === this.products.length){
                return `No extiste producto con id ${id}`;
            }
            this.products = filteredProds;
            this.saveFile();
            return `Producto con id ${id} eliminado con éxito`;
        }catch(err){
            console.log(`Elproducto no existe: ${err}`);
        };
    };        
};

// *********** TESTING **************

const productManager = new ProductManager("productos.json");
console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba1","Este es un producto prueba",200,"sin imagen","abc123",25));
console.log(productManager.addProduct("Este es un producto prueba",200,"sin imagen","abc1234",25)); // PRODUCTO SIN UN CAMPO
console.log(productManager.addProduct("producto prueba2","Este es un producto prueba",200,"sin imagen","abc1234",25)); 
console.log(productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25)); // PRODUCTO CON CODIGO REPETIDO
console.log(productManager.deleteProduct(2));
console.log(productManager.deleteProduct(5)); // PRODUCTO NO EXISTE
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2)); // ID INEXISTENTE (BORRADO)
console.log(productManager.updateProduct(1,"title","super zapatilla"));
console.log(productManager.updateProduct(1,"prize",1000)); // CAMPO MAL INGRESADO
console.log(productManager.updateProduct(5,"price",1000)); // ID NO EXISTE
console.log(productManager.addProduct("producto prueba2","Este es un producto prueba",200,"sin imagen","abc123456",25)); 
console.log(productManager.getProducts());

