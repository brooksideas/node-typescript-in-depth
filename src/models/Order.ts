import mongoose, { Document, Schema } from "mongoose";
const autoIncrement = require('mongoose-auto-increment');

export interface IOrder {
    // orderId: Number,
    createdAt: Date,
    subtotal: number,
    taxtotal: number,
    floristonetax: number,
    floristonedeliverycharge: number

}


export interface IOrderModel extends IOrder, Document { }


const productSchema = new Schema({
    // orderId: { type: Number },
    createdAt: { type: Date },
    subtotal: { type: Number, required: true },
    taxtotal: { type: Number, required: true },
    floristonetax: { type: Number, required: true },
    floristonedeliverycharge: { type: Number, required: true }
});
autoIncrement.initialize(mongoose.connection);
// Auto Increment for Order Id
productSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'orderId',
    startAt: 1,
    incrementBy: 1
});
export default mongoose.model<IOrderModel>("orders", productSchema);
