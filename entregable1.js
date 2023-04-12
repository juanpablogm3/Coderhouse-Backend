class ProductManager{
    constructor(){
        this.products=[];
        this.idManager= 0;
    }

    addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock){
        const newProduct={
            id: this.idManager,
            title: newTitle,
            description: newDescription,
            price: newPrice,
            thumbnail: newThumbnail,
            code: newCode,
            stock: newStock
        }
        
        const existingProduct = this.products.find((p) => p.code === newCode);
        if (existingProduct === undefined) {
            this.products.push(newProduct)
            this.idManager++;
        }else{
            console.log(`El producto con código ${newCode} ya existe`);
        }

        
    }

    getProducts(){
        return this.products;
    }


    getProductById(id) {
        const productById = this.products.find((elem) => elem.id === id);
        if (productById !== undefined) {
            return productById;
        } else {
            return `Producto con id ${id} no existe`;
        }
    }
}

// *********** TESTING **************
const productManager = new ProductManager();

console.log(productManager.getProducts());
productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25);
console.log(productManager.getProducts());
productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25);
console.log(productManager.getProductById(0));
console.log(productManager.getProductById(66));
