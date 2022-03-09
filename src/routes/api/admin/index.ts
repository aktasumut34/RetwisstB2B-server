import { Router } from "express";
import UsersRouter from "./users";
import CategoriesRouter from "./categories";
const router = Router();
router.use("/users", UsersRouter);
router.use("/categories", CategoriesRouter);
export default router;
