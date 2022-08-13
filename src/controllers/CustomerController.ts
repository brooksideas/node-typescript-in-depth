import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Customer from "../models/Customer";

// Create
const createCustomer = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, address1, address2, city, state, country, phone, zipcode, ip } = req.body;

    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        name, email, address1, address2, city, state, country, phone, zipcode, ip
    });

    return customer
        .save()
        .then((customer) => res.status(201).json({ customer }))
        .catch((error) => res.status(500).json(error))
};


export default { createCustomer }; 