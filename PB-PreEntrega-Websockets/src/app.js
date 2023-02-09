import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io";
import PM from "./index.js";
import dotenv from "dotenv";
import __dirname from "./utils/dirname.js";
dotenv.config();
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Servidor activo y escuchando por puerto: ${PORT}`);
});
const socketServer = new Server(httpServer);
console.log(PM.getProducts);
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());

app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "public"));
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);