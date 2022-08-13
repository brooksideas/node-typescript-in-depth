import { Request, Response, NextFunction } from "express";
import { IFlower } from "../models/Flower";
import axios from "axios";
import Product from "../models/Product";
import Order from "../models/Order";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { category, sorttype } = req.query;
    const count: number = +(req.query.count!);
    // TODO :: Make this process reusable as singleton
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(403).send({ message: 'Forbidden' });
    const encoded = authorization?.substring(6);
    const decoded = Buffer.from(encoded, 'base64').toString("ascii");
    const username = decoded.split(':')[0];
    const password = decoded.split(':')[1];

    await axios.get("https://www.floristone.com/api/rest/flowershop/getproducts",
        {
            auth: {
                username: username,
                password: password
            },
            params: { category, count, sorttype }
        }).then((products) => {
            let productList: IFlower[] = [];
            products.data.PRODUCTS.map((product: any) => {
                const { CODE, SMALL, LARGE, PRICE, DESCRIPTION } = product;
                if (product) {
                    productList.push({
                        code: CODE,
                        description: DESCRIPTION,
                        price: PRICE,
                        imageUrl: { small: SMALL, large: LARGE }

                    });
                }
            });
            return res.status(200).json({ productList, total: productList.length });

        })
        .catch((error) => res.status(500).json({ error: `Failed to fetch ${error}` }))

}

// Customer Purchases
const purchaseProduct = async (req: Request, res: Response, next: NextFunction) => {

    // TODO :: Make this process reusable as singleton
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(403).send({ message: 'Forbidden' });
    const encoded = authorization?.substring(6);
    const decoded = Buffer.from(encoded, 'base64').toString("ascii");
    const username = decoded.split(':')[0];
    const password = decoded.split(':')[1];

    // Customer Purchasing the product being purchased 
    const { customerId, productCode } = req.body;
    // product Found and total order 
    let productFound: any, totalOrder: any;

    // Product being purchased
    await axios.get("https://www.floristone.com/api/rest/flowershop/getproducts", {
        auth: {
            username: username,
            password: password
        },
        params: {
            code: productCode
        }
    }).then(async (product) => {
        productFound = product.data.PRODUCTS[0];
        totalOrder = await axios.get("https://www.floristone.com/api/rest/flowershop/gettotal", {
            auth: {
                username: username,
                password: password
            },
            params: {
                products: [productFound]
            }
        });
    }).then((response) => {

        totalOrder = response;

        const order = new Order({
            createdAt: Date.now(),
            subtotal: totalOrder.SUBTOTAL,
            taxtotal: totalOrder.TAXTOTAL,
            floristonetax: totalOrder.FLORISTONETAX,
            floristonedeliverycharge: totalOrder.FLORISTONEDELIVERYCHARGE
        });

        order.save().then(() => {
            const product = new Product({
                productCode: productFound.CODE,
                productName: productFound.NAME,
                price: productFound.PRICE,
                description: productFound.DESCRIPTION,
                customerId: customerId
            });

            return product
                .save()
                .then((product) => res.status(201).json({ product }))
                .catch((error) => res.status(500).json(error))
        })

    })


}


export default { getProducts, purchaseProduct };