import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
    };

    async createCart() {
        try {
            let carts = []
            if (fs.existsSync(this.path)){
                const cartStr = await fs.promises.readFile(this.path, 'utf-8');
                carts = JSON.parse(cartStr);
            }
            const id = carts.length>0 ? carts[carts.length-1].id + 1 : 1;
            const newCart = {id, products:[]}
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return {newCart};            
        } catch (err) {
            throw new Error(err+' Error getting carts');
        }
    };

    async getCartById(id) {
        try {
            if (fs.existsSync(this.path)){
                const cartStr = await fs.promises.readFile(this.path, 'utf-8');
                let carts = JSON.parse(cartStr);
                let cartFound = carts.find((c)=>c.id === id);
                return !cartFound ? `Cart with id ${id} not found`: cartFound.products;
            } else {
                return 'Cart does not exist';
            }
        } catch (err) {
            throw new Error(err);
        }
    };


/* 
  async addProduct(newProduct) {
    try {
      let products = await this.getProducts(); 
      const existingProduct = products.find(p => p.code === newProduct.code);
      if (existingProduct) {
        return 'Code already exists';
      }
      if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.status || !newProduct.category || !newProduct.stock) {
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
      //ENCONTRAR ERROR: solo funciona con title!!!
      /* if (field !== ('title' || 'description' || 'price' || 'thumbnail' || 'status' || 'category' || 'code' || 'stock')) {
        return `Field error: ${field}`
      } *//*
      if (!['title', 'description', 'price', 'thumbnail', 'status', 'category', 'code', 'stock'].includes(field)) {
        return `Field error: ${field}`;
      }

      products[indexToUpdate][field] = newValue;
      const prodString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, prodString);
      return products[indexToUpdate];
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
          return {msg: 'Product deleted succesfully'};
        }
    }catch(err){
        throw new Error(err+' Product does not exist');
    };
  };   */      
};

export default CartManager;