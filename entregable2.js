class ProductManager{
    constructor(){
        this.products=[];
    };
    
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
        return 'Producto agregado con éxito';

    };

    getProducts(){
        return this.products;
    };


    getProductById(id) {
        const productById = this.products.find((elem) => elem.id === id);
        if (!productById) {
            return `Producto con id ${id} no existe`;
        }
        return productById;
    };
};

// *********** TESTING **************
const productManager = new ProductManager();

console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25));
console.log(productManager.addProduct("Este es un producto prueba",200,"sin imagen","abc1234",25)); // PRODUCTO SIN UN CAMPO
console.log(productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc1234",25)); 
console.log(productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25)); // PRODUCTO CON CODIGO REPETIDO
console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(66)); // ID INEXISTENTE
