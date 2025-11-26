const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/pizzas", async (req, res) => {
  const pizzas = await prisma.pizza.findMany();
  res.json(pizzas);
});

app.listen(3000, () => {
  console.log("서버 시즌 4!!");
});
