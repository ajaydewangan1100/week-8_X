import { Router } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { Account, User } from "../db.js";
import { authMiddleware } from "../middleware.js";

const router = Router();
// me route for check ----------------------------------
router.get("/me", authMiddleware, async (req, res) => {
  res.status(200).send({ success: true });
});

// signin route ----------------------------------------
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string,
});

router.post("/signin", async (req, res) => {
  const bodyParse = signinBody.safeParse(req.body);
  console.log(">>>>>>>>>>");
  if (!bodyParse.success) {
    return res.status(411).json({ message: "incorrect input" });
  }

  const body = req.body;

  const existedUser = await User.findOne({ username: body.username });

  if (!existedUser) {
    return res.status(401).json({ message: "User not available" });
  }

  const token = jwt.sign({ userID: createdUser._id }, JWT_SECRET);

  res.status(200).json({ success: true, token });
});

// signup related --------------------------------------
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const bodyParse = signupBody.safeParse(req.body);

  if (!bodyParse.success) {
    return res.status(411).json({ message: "incorrect input" });
  }

  const body = req.body;

  const existedUser = await User.findOne({ username: body.username });

  if (existedUser) {
    return res.status(411).json({ message: "Email already exists" });
  }

  const createdUser = await User.create({
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    password: body.password,
  });

  if (!createdUser) {
    return res.status(411).json({ message: "Some Error occured, try again" });
  }

  //console.log("CreatedUser>>>>>", createdUser);

  const newAccount = await Account.create({
    userId: createdUser._id,
    balance: 1 + (Math.random() * 10000).toFixed(2),
  });
  //console.log("Createdaccount>>>>>", newAccount);

  const token = jwt.sign({ userID: createdUser._id }, JWT_SECRET);
  //console.log(token);

  res.status(200).json({ success: true, token });
});

// user details update related -----------------------------
const updateBody = zod.object({
  firstName: zod.string().optional(),
  password: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const bodyParse = updateBody.safeParse(req.body);

  if (!bodyParse.success) {
    return res.status(411).json({ message: "incorrect input" });
  }

  const updated = await User.updateOne({ _id: req.userId }, req.body);

  if (!updated) {
    return res.status(501).json({ message: "Some error occured" });
  }

  res.json({ message: "Updated successfully" });
});

// getting users based on search ------------------------------
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });

  if (!users) {
    res.status(400).json({ message: "Not found any User" });
  }

  res.json({
    users: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      _id: user._id,
    })),
  });
});

export default router;
