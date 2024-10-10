import express, { Request, Response } from 'express'
import {  createUser, deleteUser, getAllUsers, getUser, healthCheck, updateUser } from "../controllers/users";

const userRouter = express.Router()

userRouter.get("/health", healthCheck)

userRouter.get("/all", getAllUsers)
userRouter.get("/:id", getUser)
userRouter.post("/", createUser)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

export default userRouter