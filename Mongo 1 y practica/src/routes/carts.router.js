import fs from "fs";
import { Router } from "express";
const path = "./src/data";
const router = Router();
const Carts = []; //id=0, products=[]
const nwCart = {
  id: 0,
  products: [],
};
const LoadData = async () => {
  try {
    let data = await fs.promises.readFile(`${path}/carts.json`, "utf8");
    let parsedData = [];
    parsedData = JSON.parse(data);
    parsedData.forEach((cart) => {
      Carts.push(cart);
    });
  } catch (err) {
    console.log(err);
  }
};
LoadData();
console.log(Carts);
const SaveData = async () => {
  try {
    await fs.promises.writeFile(
      `${path}/carts.json`,
      JSON.stringify(Carts),
      "utf-8"
    );
  } catch (err) {
    console.log(err);
  }
};

router.get("/:cId", (req, res) => {
  const { cId } = req.params;
  const cart = Carts.find((item) => item.id === parseInt(cId));
  if (!cart) res.status(400).send("Carrito invalido o inexistente");
  return res.status(200).send(cart);
}); //Get Cart

router.post("/:cId/products/:pId", (req, res) => {
  const { cId, pId } = req.params;
  if (!cId || !pId)
    return res
      .status(400)
      .send({ message: "Faltan Parametos en la Solicitud" });
  const Prod = req.body;
  const cartIndex = Carts.findIndex((cart) => cart.id === parseInt(cId));
  if (!cartIndex) {
    nwCart.id = Carts[Carts.lenght - 1].id + 1;
    nwCart.products = [];
    Carts.push(nwCart);
  }
  const Cart = Carts[cartIndex];
  const prodIndex = Carts[cartIndex].products.findIndex(
    (item) => (item.id = parseInt(pId))
  );
  if (prodIndex) {
    Cart.products[prodIndex].quantity += Prod.quantity;
  } else {
    const nwProd = { idProd: id, quantity: Prod.quantity };
    Cart.products.push(nwProd);
  }
  Carts[cartIndex] = Cart;
  SaveData();
  return res.status(200).send("Carrito Modificado");
}); //Agregar - Modificar Producto

export default router;