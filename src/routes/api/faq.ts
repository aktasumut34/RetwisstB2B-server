import { Router } from "express";
import { getAllFaqs } from "../../controllers/FAQController";
const router = Router();

router.get("/", getAllFaqs);

export default router;
