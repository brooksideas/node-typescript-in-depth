import mongoose, { Document, Schema } from "mongoose";

export interface IProduct {
    productCode: string,
    productName: string,
    price: number,
    description: string,
    image?: string
}


export interface IProductModel extends IProduct, Document { }


const productSchema = new Schema({
    productCode: { type: String, unique: true, required: true },
    productName: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    orderId: { type: Schema.Types.Number, ref: "Order" },
    customerId: [{ type: Schema.Types.ObjectId, ref: 'Customer' }]
})

export default mongoose.model<IProductModel>("products", productSchema);