import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", productRoutes);
app.get('/', (req, res) => {
  res.send('NextCommerce is cooking')
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));