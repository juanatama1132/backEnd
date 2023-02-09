import express from "express";
import PM from "../index.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {});
});
export default router;