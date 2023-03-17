import { Router } from "express";
import PM from "../Dao/ProductManager.js";
const router = Router();
const Products = [];

router.get("/", async (req, res) => {
  // console.log(req.params);
  try {
    const prodList = await PM.getProducts(req.query);
    console.log(prodList);
    res.render("products", { prodList, style: "products.css" });
  } catch (error) {
    console.log(error);
  }
}); //Get all Products

router.get("/:pId", async (req, res) => {
  const { pId } = req.params;
  try {
    const product = PM.getProductById(pId);
    if (!product) res.status(400).send("Producto invalido o inexistente");
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).send("Producto invalido o inexistente");
  }
}); //Get Product Info

router.post("/", async (req, res) => {
  const { description, code, price, category } = req.body;
  if (!description || !code || !price || !category)
    res.status(400).send({
      message: "Faltan Datos sobre el Producto, Transaccion Cancelada",
    });

  // console.log("Post");
  try {
    await PM.addProduct(req.body);
    res.status(201).send({ message: "Producto Agregado Exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error al agregar Producto, Transaccion Cancelada",
    });
  }
}); //Add New Product

router.put("/:pId", async (req, res) => {
  const { pId } = req.params;
  const { code, description, stock } = req.body;
  if (!code || !description || !stock) {
    res.status(400).send({
      message: `Faltan enviar datos del Producto ${
        !product.code ? " Codigo" : ""
      } ${!product.description ? " Descripcion del Producto" : ""}${
        !product.stock ? " Stock Disponible" : ""
      }`,
    });
    try {
      await PM.modProduct(pId, code, description, stock);
      res.status(200).send({ message: "Producto Actualizado Correctamente" });
    } catch (error) {
      res
        .status(400)
        .send({ message: "Error al Actualizar, Transaccion Cancelada" });
    }
  }
}); //Modify Product Data (Detail, Stock, Price)

router.delete("/:pId", async (req, res) => {
  const { pId } = req.params;
  try {
    await PM.delProduct(pId);
    return res.status(200).send({ message: "Producto Marcado para Eliminar" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "No se Pudo Eliminar Producto" });
  }
}); //Cambio estado a False

export default router;