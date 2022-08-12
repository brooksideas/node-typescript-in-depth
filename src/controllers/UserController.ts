import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Book from "../models/Book";
import User from "../models/User";

const createUser = (req: Request, res: Response, next: NextFunction) => {

    const { userId, name, username, email } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userId: userId,
        name: name,
        username: username,
        email: email
    });

    return user.save()
        .then((user) => {
            const book = new Book({
                _id: new mongoose.Types.ObjectId(),
                title: 'Casino Royale',
                author: 'authoes',
                owner: user._id
            });

            book.save().then((book) => {
                console.log('STORED', book);
            })
            res.status(201).json({ user })

        })
        .catch((error) => res.status(500).json({ message: `failed to create the user ${error}` }))
}


const readOneUser = (req: Request, res: Response, next: NextFunction) => {

    const { userId } = req.params;

    return User.findById(userId).select("-__v").then((user) => res.status(302).json({ user }))
        .catch((error) => res.status(500).json({ message: `failed to find the user ${error}` }))

}
const readAllUsers = (req: Request, res: Response, next: NextFunction) => {
    return User.find().then((users) => res.status(302).json({ users }))
        .catch((error) => res.status(500).json({ message: `failed to find any of the users ${error}` }))
}
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    User.findById(userId).then((user) => {
        if (user) {
            user.set(req.body);
            user.save().then((response) => res.status(202).json({ response }))
        } else {
            res.status(404).json({ message: "User is not found!" });
        }
    })
        .catch((error) => res.status(500).json({ message: `failed to find the users ${error}` }))

}
const deleteUser = (req: Request, res: Response, next: NextFunction) => {

    const { userId } = req.params;

    User.findByIdAndDelete(userId).then(() => res.status(200).json({ message: `deleted user with ${userId}` }))
        .catch((error) => res.status(500).json({ message: `failed to find the users ${error}` }))


}

export default { createUser, readOneUser, readAllUsers, updateUser, deleteUser };
