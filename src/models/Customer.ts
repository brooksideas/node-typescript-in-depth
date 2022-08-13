import mongoose, { Document, Schema } from "mongoose";


export interface ICustomer {
    name: string,
    email: string,
    address1: string,
    address2?: string,
    city: string,
    state: string,
    country: string,
    phone?: number,
    zipcode: number,
    ip: string

}


export interface ICustomerModel extends ICustomer, Document { }


const customerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true, min: 2, max: 2 },
    country: { type: String, required: true, min: 2, max: 2 },
    phone: { type: Number, max: 10 },
    zipcode: { type: Number, required: true, min: 5 },
    ip: { type: String, required: true },
    customerId: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

export default mongoose.model<ICustomerModel>("customers", customerSchema);