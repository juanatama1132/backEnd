import PM from "../index.js";
import fs from "fs";
import { Router } from "express";
const path = "./src/data";
const router = Router();
const Products = [];
const nwProduct = {
  id: 0,
  title: "",
  description: "",
  code: "",
  price: 0,
  status: true,
  stock: 0,
  category: "",
  thumbnails: [],
};

//const LoadData = async () => {
//  try {
//    let data = await fs.promises.readFile(`${path}/products.json`, "utf8");
//    let parsedData = [];
//    parsedData = JSON.parse(data);
//    parsedData.forEach((product) => {
//      Products.push(product);
//    });
//  } catch (err) {
//    console.log(err);
//  }
//};
//LoadData();
//const SaveData = async () => {
// try {
//   await fs.promises.writeFile(
//     `${path}/products.json`,
//     JSON.stringify(Products),
//     "utf-8"
//   );
// } catch (err) {
//   console.log(err);
// }
//};

const getNwIndex = () => {
  return Products[Products.length - 1].id + 1;
};
router.get("/", (req, res) => {
  const { limit } = req.query;
  //if (!limit || !Number.isInteger(parseInt(limit))) res.send(Products);
  //const prodList = Products.filter((product) => product.id <= limit);
  //res.send(prodList);
  if (!limit || !Number.isInteger(parseInt(limit))) res.send(PM.getProducts());
  res.send(PM.getProducts(limit));
}); //Get all Products

router.get("/:pId", (req, res) => {
  const { pId } = req.params;
  // const product = Products.find((item) => item.id === parseInt(pId));
  // if (!product) res.status(400).send("Producto invalido o inexistente");
  const product = PM.getProductById(pId);
  if (!product) res.status(400).send("Producto invalido o inexistente");
  res.send(product);
}); //Get Product Info

router.post("/", (req, res) => {
  let prod = req.body;
  if (!prod.description || !prod.code || !prod.price || !prod.category)
    return res.status(400).send({
      message: "Faltan Datos sobre el Producto Transaccion Cancelada",
    });
  console.log("Post");
  const thumbs = [];
  PM.addProduct(
    prod.product,
    prod.description,
    prod.code,
    prod.price,
    prod.stock,
    prod.category,
    thumbs
  );
  // nwProduct.id = getNwIndex();
  // nwProduct.description = prod.description;
  // nwProduct.code = prod.code;
  // nwProduct.price = prod.price;
  // (nwProduct.status = true), (nwProduct.stock = prod.stock);
  // nwProduct.category = prod.category;
  // nwProduct.thumbnails = prod.thumbnails;
  //
  // Products.push(nwProduct);
  // SaveData();
  PM.SaveData;
  return res.status(201).send({ message: "Producto Agregado Exitosamente" });
}); //Add New Product

router.put("/:pId", (req, res) => {
  const { pId } = req.params;
  const index = Products.findIndex((prod) => prod.id === parseInt(pId));
  if (!index) {
    return res.status(404).send({ message: "Producto Inexistente" });
  }
  let product = req.body;
  if (!product.code || !product.description || !product.stock) {
    return res.status(400).send({
      message: `Faltan enviar datos del Producto ${
        !product.code ? " Codigo" : ""
      } ${!product.description ? " Descripcion del Producto" : ""}${
        !product.stock ? " Stock Disponible" : ""
      }`,
    });
  }
  let prod = Products[index];

  if (!prod.status) {
    prod.status = true;
  }
  prod.description = product.description;
  prod.stock = product.stock;
  Products[index] = prod;

  SaveData();
  return res
    .status(201)
    .send({ message: "Producto Actualizado Correctamente" });
}); //Modify Product Data (Detail, Stock, Price)

router.delete("/:pId", (req, res) => {
  const { pId } = req.params;
  const index = Products.findIndex((prod) => prod.id === parseInt(uId));
  if (!index) {
    return res.status(404).send({ message: "Producto Inexistente" });
  }
  let prod = Products[index];
  if (!prod.status) {
    return res
      .status(400)
      .send({ message: "El Producto ya esta Marcado para Eliminar" });
  }
  prod.status = false;
  Products[index] = prod;
  return res.status(201).send({ message: "Producto Marcado para Eliminar" });
  SaveData();
}); //Cambio estado a False

export default router;