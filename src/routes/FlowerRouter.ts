import express from "express";
import FlowerController from "../controllers/FlowerController";

const router = express.Router();

// destructure 
const { getProducts, purchaseProduct } = FlowerController;

router.get('/getproducts', getProducts);
router.post('/purchase', purchaseProduct);

export = router;
