import express from 'express';
import CustomerController from '../controllers/CustomerController';
const router = express.Router();
const { createCustomer } = CustomerController;
router.post('/create', createCustomer);

export = router;