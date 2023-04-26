import fs from 'fs';

class ProductManager{
    constructor(path){
        this.path = path;
        this.products=[];
        this.idManager = [];
    };

    async readFile(){
        try{
            const prodsStr =  await fs.promises.readFile(this.path, "utf-8");
            this.products = JSON.parse(prodsStr);
            return this.products;
        } catch(err){
            return `El archivo no existe: ${err}`;
        }
    };

    async saveFile(){
        const prodStr = JSON.stringify(this.products, null, 2);
        try{
            await fs.promises.writeFile(this.path, prodStr);
            return "Archivo guardado con éxito";
        } catch(err) {
            return `Error al escribir el archivo: ${err}`;
        }
    };

    async getNextId() {
        const newId = await new Promise((resolve) => {
            const nextId = this.idManager.length > 0 ? Math.min(...this.idManager) : 1;
            let availableId = nextId;
            while (this.idManager.includes(availableId)) {
                availableId++;
            }
            resolve(availableId);
        });
        return newId;
    }
        

            
    async addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock){
        
        await this.readFile();

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

        const newId = await this.getNextId();
        newProduct.id = newId;
        this.idManager.push(newId);
        this.products.push(newProduct);
        this.idManager.sort((a,b)=>a-b);
        this.products.sort((a,b)=>a.id-b.id);
        await this.saveFile();
        return `Producto agregado con éxito`;

    };

    async getProducts(){
       await this.readFile();
       return this.products.length>0 ? this.products : `No hay productos`;
    };


    async getProductById(id) {
        try{
           await this.readFile();
            const productById = this.products.find((elem) => elem.id === id);
            if (!productById) {
                return `Producto con id ${id} no existe`;
            }
            return productById;
        } catch(err){
            console.log(err);
        }
    };
    
    async updateProduct(id, field, newValue){
        try{
            await this.readFile();
            const indexToUpdate = this.products.findIndex(elem => elem.id === id);
            if (indexToUpdate===-1){
                return `No existe un producto con id ${id}`;
            }
            if(field!==("title" || "description" || "price" || "thumbnail" || "code" || "stock")){
                return `Error en el campo a modificar: ${field}`;
            }
            this.products[indexToUpdate][field] = newValue;
            await this.saveFile();
            return `Producto actualizado con éxito`;
        } catch(err){
            console.log(`Error en update ${err}`);
        }
    }

    async deleteProduct(id){
        try{
            await this.readFile();
            const filteredProds = this.products.filter((elem)=> elem.id !== id )
            if (filteredProds.length === this.products.length){
                return `No extiste producto con id ${id}`;
            }
            this.products = filteredProds;
            await this.saveFile();
            const idIndex = this.idManager.indexOf(id);
            this.idManager.splice(idIndex,1);
            return `Producto con id ${id} eliminado con éxito`;
        }catch(err){
            console.log(`El producto no existe: ${err}`);
        };
    };        
};


// *********** TESTING **************
/* const productManager = new ProductManager("productos.json");
console.log(productManager.getProducts()); // Sin estar creado el array de productos
console.log(productManager.addProduct("producto prueba1","Este es un producto prueba",200,"sin imagen","abc123",25)); // con ID 1
console.log(productManager.addProduct("Este es un producto prueba",200,"sin imagen","abc1234",25)); // PRODUCTO SIN UN CAMPO
console.log(productManager.addProduct("producto prueba2","Este es un producto prueba",200,"sin imagen","abc1234",25)); // con ID 2
console.log(productManager.addProduct("producto prueba3","Este es un producto prueba",200,"sin imagen","abc12345",25)); // con ID 3
console.log(productManager.addProduct("producto prueba4","Este es un producto prueba",200,"sin imagen","abc12346",25)); // con ID 4
console.log(productManager.addProduct("producto prueba5","Este es un producto prueba",200,"sin imagen","abc12347",25)); // con ID 5
console.log(productManager.addProduct("producto prueba6","Este es un producto prueba",200,"sin imagen","abc12348",25)); // con ID 6
console.log(productManager.addProduct("producto prueba7","Este es un producto prueba",200,"sin imagen","abc12349",25)); // con ID 7
console.log(productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25)); // PRODUCTO CON CODIGO REPETIDO
console.log(productManager.deleteProduct(2));
console.log(productManager.deleteProduct(22)); // PRODUCTO NO EXISTE
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(22)); // ID INEXISTENTE
console.log(productManager.updateProduct(1,"title","super zapatilla"));
console.log(productManager.updateProduct(1,"prize",1000)); // CAMPO MAL INGRESADO
console.log(productManager.updateProduct(22,"price",1000)); // ID NO EXISTE
console.log(productManager.addProduct("producto prueba8","Este es un producto prueba",200,"sin imagen","abc123456",25)); // Para demostrar que usa ids mínimos disponibles
console.log(productManager.getProducts()); */