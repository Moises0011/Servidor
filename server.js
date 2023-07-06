const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const products = [];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.status(201).json(product);
});

app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require("express");
// const cors = require("cors");
// const { PrismaClient } = require("@prisma/client");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const prisma = new PrismaClient();

// app.get("/products", async (req, res) => {
//   const products = await prisma.product.findMany();
//   res.json(products);
// });

// app.post("/products", async (req, res) => {
//   const { name, category, price } = req.body;
//   const product = await prisma.product.create({
//     data: { name, category, price },
//   });
//   res.status(201).json(product);
// });

// app.delete("/products/:id", async (req, res) => {
//   const productId = parseInt(req.params.id);
//   const product = await prisma.product.delete({
//     where: { id: productId },
//   });
//   res.sendStatus(204);
// });

// const port = 8000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
