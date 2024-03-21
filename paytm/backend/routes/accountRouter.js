import express from "express";
import { Account, User } from "../db.js";
import { authMiddleware } from "../middleware.js";
import mongoose from "mongoose";

const router = express.Router();

// ping route for check
router.get("/ping", (req, res) => {
  res.send("pong from Account");
});

// get balance route
router.get("/balance", authMiddleware, async (req, res) => {
  const details = await Account.findOne({ userId: req.userId });
  //console.log(">>>>>>>>>>>", details);
  if (!details) {
    return res
      .status(501)
      .send({ success: false, message: "Some error occured, try again" });
  }
  res.json({ balance: details.balance });
});

// money transfer router
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || !account.balance || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

export default router;
