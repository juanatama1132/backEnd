class ProductMannager {
  constructor() {
    this.products = [];
  }

  addProduct = (producto, precio, imgPath, productId, stock) => {
    const product = {
      id: 0,
      title: producto,
      price: precio,
      thumbnail: imgPath,
      code: productId,
      stock: stock,
    };

    if (this.products.findIndex((product) => product.code === productId)) {
      if (this.products.length === 0) {
        product.id = 1;
      } else {
        product.id = this.products[this.products.length - 1].id + 1;
      }

      this.products.push(product);
    } else {
      console.log(`Duplicated Code "${productId}"`);
    }
  };
  getProducts = () => {
    return this.products;
  };
  getProductById = (id) => {
    const res = this.products.filter((product) => product.id === id);
    // console.log(res);
    if (res.length === 0) {
      return '"Product not Found"';
    } else {
      return res;
    }
  };
}
const PM = new ProductMannager();

addProducts();
console.log("Listado de Productos");
console.log(PM.getProducts());
console.log("");
console.log("");
console.log(`Producto id=1`);
console.log(PM.getProductById(1));
console.log(`Producto id=5`);
console.log(PM.getProductById(5));
console.log(`Producto id=2`);
console.log(PM.getProductById(2));
console.log(`Producto id=4`);
console.log(PM.getProductById(4));
console.log(`Producto id=3`);
console.log(PM.getProductById(3));
console.log(`Producto id=6`);
console.log(PM.getProductById(6));

function addProducts() {
  // title, price, thumbnail, stock
  PM.addProduct("Madera de Pino", 200, "./img/MaderaPino.jpg", `md-Pino`, 20);
  PM.addProduct(
    "Madera de Quebracho",
    500,
    "./img/QuebrachoColorado.jpg",
    "md-QuebCol",
    5
  );
  PM.addProduct(
    "Madera de Espinillo",
    350,
    "./img/MaderaEspinillo.jpg",
    "md-Espinillo",
    10
  );

  PM.addProduct("Madera de Pino", 200, "./img/MaderaPino.jpg", `md-Pino`, 20); //Duplicado

  PM.addProduct(
    "Carbon de Quebracho Blanco",
    350,
    "./img/CarbonQuebrBlanco.jpg",
    "cb-QuebBco",
    25
  );
  PM.addProduct("Briquetas", 600, "./img/Briquetas.jpg", "cb-Briq", 15);
}
