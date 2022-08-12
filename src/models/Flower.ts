import mongoose, { Document, Schema } from "mongoose";


export interface IFlower {
    code: string,
    description: string,
    price: number,
    imageUrl: object //CDN 
}


export interface IFlowerModel extends IFlower, Document { }


const flowerSchema = new Schema({
    code: { type: String, unique: true, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    imageUrl: { type: Object, default: {} }
})

export default mongoose.model<IFlowerModel>("flowers", flowerSchema);