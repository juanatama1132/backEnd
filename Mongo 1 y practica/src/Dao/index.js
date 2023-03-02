import fs from "fs";
class ProductMannager {
  #path = "./data";
  #data;
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
      return;
    }
    return console.log(`Duplicated Code "${productId}"`);
  };
  getProducts = () => {
    return this.products;
  };
  getProductById = (id) => {
    const res = this.products.filter((product) => product.id === id);
    if (res.length === 0) {
      return '"Product not Found"';
    }
    return res;
  };

  SaveData = () => {
    this.#data = JSON.stringify(this.products);
    fs.promises
      .writeFile(`${this.#path}/stock.dat`, this.#data, "utf-8")
      .then(() => console.log("Fichero actualizado}"))
      .catch((err) => console.log(err));
    return;
  };

  LoadData = async () => {
    if (!fs.existsSync(`${this.#path}/stock.dat`)) {
      addProducts();
      // return;
    }
    try {
      this.#data = await fs.promises.readFile(
        `${this.#path}/stock.dat`,
        "utf8"
      );
      this.products = JSON.parse(this.#data);
      console.log(this.products);
    } catch (err) {
      console.log(err);
    }
  };
}
const PM = new ProductMannager();

PM.LoadData();
function addProducts() {

    PM.addProduct("Cal", 200, "Bolsa-Cal", 20);
    PM.addProduct(
      "Cemento",
      50,
      "Bolsa-Cemento",
      5
    );
    PM.addProduct(
      "Arena",
      20,
      "mts-arena",
    );
    PM.addProduct(
      "Madera",
      950,
      "mts-madera",
      10
    );
  
    PM.addProduct(
      "Madera Eucalipto",
      350,
      "md-Eucalipto",
      15
    );
  
    PM.addProduct(
      "Hierro",
      560,
      "Bar-8 pulg",
      85
    );
  
    PM.addProduct(
      "Hierro",
      600,
      "Bar-10 pulg",
      25
    );
    PM.addProduct("Barra de Oro", 53200, `18k`, 3);
    PM.addProduct(
      "Barra de Oro",
      333500,
      "b-21k",
      5
    );
    PM.addProduct(
      "Barra de Plata",
      25350,
      "b-295",
      10
    );
  
    PM.addProduct("Mezquita", 77100, "b-mezq", 90);
  
    PM.addProduct(
      "Austenita",
      6650,
      "b-aust",
      25
    );
    PM.addProduct("Perlita", 88600, "b-Per", 5);
  
  PM.SaveData();
  };
  export default PM;