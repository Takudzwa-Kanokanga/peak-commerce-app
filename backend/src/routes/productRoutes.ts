import { Router } from "express";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  restockProduct
} from "../controllers/product";
import { uploadProductImage } from "../middleware/upload";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", authenticate, requireAdmin, uploadProductImage.array("images", 6), createProduct);
router.put("/:id", authenticate, requireAdmin, uploadProductImage.array("images", 6), updateProduct);
router.delete("/:id", authenticate, requireAdmin, deleteProduct);
router.post("/:id/restock", authenticate, requireAdmin, restockProduct);

export default router;
