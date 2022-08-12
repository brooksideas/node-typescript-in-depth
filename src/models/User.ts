import mongoose, { Document, Mongoose, Schema } from "mongoose";


export interface IUser {
    _id: string,
    userId: number,
    name: string,
    username: string,
    email: string,
    books: any
};

export interface IUserModel extends IUser, mongoose.Document {
    _id: string,
}

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    username: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }]
}, { versionKey: false });


export default mongoose.model<IUserModel>("users", userSchema);

