import express from "express";
import FlowerController from "../controllers/FlowerController";

const router = express.Router();

// destructure 
const { getProducts } = FlowerController;

router.get('/getproducts', getProducts);

export = router;
