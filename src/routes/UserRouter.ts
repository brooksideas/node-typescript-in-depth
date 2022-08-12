import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

const { createUser, readOneUser, readAllUsers, updateUser, deleteUser } = UserController;

router.post('/create', createUser);
router.get('/get/:userId', readOneUser);
router.get('/get/', readAllUsers);
router.patch('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

export = router;
