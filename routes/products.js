import express from "express";
import { connectToDatabase } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// get all products
router.get("/", async (req, res) => {
  const db = await connectToDatabase();
  const products = await db.collection("products").find({}).toArray();
  res.json(products);
});

// get single product
router.get("/:id", async (req, res) => {
  const db = await connectToDatabase();
  const product = await db
    .collection("products")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// post add product
router.post("/", async (req, res) => {
  const db = await connectToDatabase();
  const { name, description, price } = req.body;
  const result = await db
    .collection("products")
    .insertOne({ name, description, price });
  res.status(201).json(result);
});

// delete product
router.delete("/:id", async (req, res) => {
  const db = await connectToDatabase();
  await db
    .collection("products")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: "Product deleted" });
});

export default router;
