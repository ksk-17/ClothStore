import express from "express";
const router = express.Router();
import {authUser,registerUser,updateUserProfile,getUserProfile,updateUser,getUserbyId,getUsers,deleteUser} from "../controllers/userControllers.js";
import {admin,protect} from "../middlewares/authMiddleware.js";

router.route('/').get(protect,admin,getUsers);
router.route('/login').post(authUser);
router.route('/register').post(registerUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserbyId).put(protect,admin,updateUser);

export default router;