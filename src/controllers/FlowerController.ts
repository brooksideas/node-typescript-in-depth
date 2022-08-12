import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { IFlower } from "../models/Flower";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { category, sorttype } = req.query;
    const count: number = +(req.query.count!);
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


export default { getProducts };