import { Router } from "express";
import userRouter from "./userRoutes.js";
import accountRouter from "./accountRouter.js";

const router = Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;
