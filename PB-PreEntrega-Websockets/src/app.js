import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io";
import PM from "./index.js";
import dotenv from "dotenv";
import __dirname from "./dirname.js";
//console.log(__dirname);
dotenv.config();
const app = express();
const PORT = 8080 || process.env.PORT;
const httpServer = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Servidor activo y escuchando por puerto: ${PORT}`);
});
const io = new Server(httpServer);

//PM.LoadData();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());

app.use(urlencoded({ extended: true }));
app.use("/virtual", express.static(__dirname + "/public"));
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);

io.on("connection", (socket) => {
  console.log("Conexion Establecida");
  socket.emit("refreshData", PM.getProducts());

  socket.on("addProduct", (msg) => {
    const { product, description, code, category, price, stock } = msg;
    const thumbs = [];
    PM.addProduct(product, description, code, category, price, stock, thumbs);
    socket.emit("refreshData", PM.getProducts());
  });
});