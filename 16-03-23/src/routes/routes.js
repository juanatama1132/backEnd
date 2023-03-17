import { Router } from "express";
import uploader from "../utils/multerConfig.js";
import viewsRouter from "./views.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";

const router = Router();
router.use("/", viewsRouter);
router.use("/api/products", productsRouter);
router.use("/api/cart", cartsRouter);

module.exports = router;