import express from "express";
// import PM from "../Dao/index.js";
import PM from "../Dao/ProductManager.js";
// import ProductModel from "../models/product.model.js";
const router = express.Router();
let prodList = [];
router.get("/", async (req, res) => {
  try {
    prodList = await PM.getProducts(req.query);
    // console.log(prodList);
    res.render("home", { prodList, style: "home.css" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Faltan Datos sobre el Producto Transaccion Cancelada",
    });
  }
});
router.get("/chat", (req, res) => {
  const prodList = PM.getProducts(true);
  res.render("chat", { prodList, style: "chat.css" });
});
// router.get("/realtimeProducts", (req, res) => {
//   const prodList = PM.getProducts(true);
//   res.render("realtimeProducts", { prodList, style: "realtimeProducts.css" });
// });

// router.post("/realtimeProducts", (req, res) => {
//   let prod = req.body;
//   if (!prod.description || !prod.code || !prod.price || !prod.category)
//     return res.status(400).send({
//       message: "Faltan Datos sobre el Producto Transaccion Cancelada",
//     });
//   console.log("Post");
//   const thumbs = [];
//   PM.addProduct(
//     prod.product,
//     prod.description,
//     prod.code,
//     prod.price,
//     prod.stock,
//     prod.category,
//     thumbs
//   );
//   PM.SaveData;
//   return res.status(201);
// });
export default router;