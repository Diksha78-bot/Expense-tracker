import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// GET all transactions
router.get("/", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

// POST new transaction
router.post("/", async (req, res) => {
  const { text, amount } = req.body;
  const transaction = new Transaction({ text, amount });
  await transaction.save();
  res.json(transaction);
});

// DELETE transaction
router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Transaction deleted" });
});

export default router;
