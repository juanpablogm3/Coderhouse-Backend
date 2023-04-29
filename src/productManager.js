import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
  };

  async getProducts() {
    try {
      if (fs.existsSync(this.path)){
        const prodsStr = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(prodsStr);

      }
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      return [];
    } catch (err) {
      throw new Error(err+' Error getting products');
    }
  };

  async addProduct(newProduct) {
    try {
      let products = await this.getProducts(); 
      const existingProduct = products.find(p => p.code === newProduct.code);
      if (existingProduct) {
        return `Code: ${newProduct.code} already exists`;
      }
      if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
        return 'Fields missing';
      }
      const id = products.length>0 ? products[products.length-1].id + 1 : 1;
      const newProdWithId = {id, ...newProduct}
      products.push(newProdWithId);
      const prodString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, prodString);
      return newProdWithId;
      
    } catch (error) {
      throw new Error(error+' Error adding product')
    }
  };
  
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productById = products.find(elem => elem.id === id);
      if(!productById){
        return `Product with id ${id} not found`;
      }
      return productById;
    } catch (err) {
      throw new Error(err);
    }
  };

  async updateProduct(id, field, newValue) {
    try {
      const products = await this.getProducts();
      const indexToUpdate = products.findIndex(elem => elem.id === id);
      if (indexToUpdate === -1) {
        return `Product id ${id} does not exist`;
      }
      if (field !== ('title' || 'description' || 'price' || 'thumbnail' || 'code' || 'stock')) {
        return `Field error: ${field}`;
      }
      products[indexToUpdate][field] = newValue;
      const prodString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, prodString);
      return 'Product updated succesfully';
    } catch (err) {
      throw new Error(err+' Update error');
    }
  };

  async deleteProduct(id){
    try{
        const products = await this.getProducts();
        const filteredProds = products.filter((elem)=> elem.id !== id )
        if (filteredProds.length === products.length){
            return `Product id ${id} does not exist`;
        } else {
          const prodString = JSON.stringify(filteredProds, null, 2);
          await fs.promises.writeFile(this.path, prodString);
          return 'Product deleted succesfully';
        }
    }catch(err){
        throw new Error(err+' Product does not exist');
    };
  };        
};

const prod = {
  "title": "Producto estrellaaaaaa",
  "description": "Descripción del producto 2",
  "price": 2099,
  "thumbnail": "ruta/de/imagen/2",
  "code": "DE456546",
  "stock": 20
}

export default ProductManager;
