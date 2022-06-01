import express from "express";
const router = express.Router();
import {getProducts,getProductById,createProduct,deleteProduct,updateProduct,createProductReview} from "../controllers/productControllers.js";
import {protect,admin} from "../middlewares/authMiddleware.js";

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/:id/reviews').post(protect,createProductReview);
router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);

export default router;