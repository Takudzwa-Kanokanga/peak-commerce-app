import { Router } from "express";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product";
import { uploadProductImage } from "../middleware/upload";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", authenticate, requireAdmin, uploadProductImage.single("image"), createProduct);
router.put("/:id", authenticate, requireAdmin, uploadProductImage.single("image"), updateProduct);
router.delete("/:id", authenticate, requireAdmin, deleteProduct);

export default router;
