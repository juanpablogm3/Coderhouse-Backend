import { promises as fs } from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.idManager = [];
  }

  async readFile() {
    try {
      const prodsStr = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(prodsStr);
      return this.products;
    } catch (err) {
      return `El archivo no existe: ${err}`;
    }
  }

  async saveFile() {
    const prodStr = JSON.stringify(this.products, null, 2);
    try {
      await fs.writeFile(this.path, prodStr);
      return 'Archivo guardado con éxito';
    } catch (err) {
      return `Error al escribir el archivo: ${err}`;
    }
  }

  async addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {
    await this.readFile();

    const newProduct = {
      title: newTitle,
      description: newDescription,
      price: newPrice,
      thumbnail: newThumbnail,
      code: newCode,
      stock: newStock
    };

    const existingProduct = this.products.find(p => p.code === newCode);
    if (existingProduct) {
      return `El producto con código ${newCode} ya existe`;
    }
    if (!newTitle || !newDescription || !newPrice || !newThumbnail || !newCode || !newStock) {
      return 'Se deben completar todos los campos';
    }

    const nextId = this.idManager.length > 0 ? Math.min(...this.idManager) : 1;
    let newId = nextId;
    while (this.idManager.includes(newId)) {
      newId++;
    }
    newProduct.id = newId;
    this.products.push(newProduct);
    this.idManager.push(newId);
    this.idManager.sort((a, b) => a - b);
    this.products.sort((a, b) => a.id - b.id);
    await this.saveFile();
    return `Producto agregado con éxito`;
  }

  async getProducts() {
    return await this.readFile();
  }

  async getProductById(id) {
    try {
      await this.readFile();
      const productById = this.products.find(elem => elem.id === id);
      if (!productById) {
        return `Producto con id ${id} no existe`;
      }
      return productById;
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(id, field, newValue) {
    try {
      await this.readFile();
      const indexToUpdate = this.products.findIndex(elem => elem.id === id);
      if (indexToUpdate === -1) {
        return `No existe un producto con id ${id}`;
      }
      if (field !== ('title' || 'description' || 'price' || 'thumbnail' || 'code' || 'stock')) {
        return `Error en el campo a modificar: ${field}`;
      }
      this.products[indexToUpdate][field] = newValue;
      await this.saveFile();
      return `Producto actualizado con éxito`;
    } catch (err) {
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

export default ProductManager;
