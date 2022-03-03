import { Router } from "express";
import { add, remove, update } from "../../controllers/CartController";
const router = Router();

router.post("/add", add);
router.post("/remove", remove);
router.post("/update", update);

export default router;
