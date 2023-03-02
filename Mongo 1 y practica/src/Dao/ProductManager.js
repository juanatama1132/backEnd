class ProductMannager {
    constructor() {
      this.products = [];
    }
  
    addProduct = (
      producto,
      detalle,
      productId,
      precio,
      stock,
      category,
      imgPath
    ) => {
      const product = {
        id: 0,
        title: producto,
        description: detalle,
        code: productId,
        price: precio,
        status: true,
        stock: stock,
        category: category,
        thumbnails: imgPath,
      };
      const index = this.products.find((product) => product.code === productId);
      console.log(index);
      if (!index) {
        if (this.products.length === 0) {
          product.id = 1;
        } else {
          product.id = this.products[this.products.length - 1].id + 1;
        }
  
        this.products.push(product);
        PM.SaveData();
        return true;
      }
      return false;
    };
  
    delProduct = (id) => {
      const index = getIndex(id);
  
      if (!product.status) {
        return false;
      }
      product.status = false;
      this.products[index] = product;
      return true;
    };
  
    modProduct = (id, description, stock) => {
      const index = this.getIndex(id);
      let product = this.products[index];
      product.description = description;
      product.stock = stock;
      product.status = true;
      this.products[index] = product;
      PM.SaveData();
      return true;
    };
  
    getIndex = (id) => {
      const index = this.products.findindex((prod) => prod.id === parseInt(id));
      return index;
    };
  
    getProducts = (limit = 0, bDel = false) => {
      if (!bDel)
        return this.products.filter((product) => product.status === true);
      return this.products;
    };
  
    getProductById = (id, bExists = false) => {
      const res = this.products.find((product) => product.id === parseInt(id));
      if (!res) {
        return false;
      }
      if (!bExists) return res;
      return true;
    };
  }
  const PM = new ProductMannager();
  module.exports = PM;