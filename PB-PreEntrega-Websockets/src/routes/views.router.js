import express from "express";
import PM from "../index.js";
const router = express.Router();

router.get("/", (req, res) => {
  const prodList = PM.getProducts();
  res.render("home", { prodList, style: "home.css" });
});
router.get("/realtimeProducts", (req, res) => {
  const prodList = PM.getProducts(true);
  res.render("realtimeProducts", { prodList, style: "realtimeProducts.css" });
});

router.post("/realtimeProducts", (req, res) => {
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
  PM.SaveData;
  return res.status(201);
});
export default router;