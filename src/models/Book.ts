import mongoose, { Document, Schema } from "mongoose";

export interface IBook {
    title: string,
    author: string,
    owner: any
};

export interface IBookModel extends IBook, Document { };

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
        owner: { type: Schema.Types.ObjectId, ref: "User" }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBookModel>('Book', BookSchema);