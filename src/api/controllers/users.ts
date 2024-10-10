import { Request, Response } from "express"
import User from "../../models/User"
import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from "../constants/http"
import appAssert from "../utils/appAssert"
import catchErrors from "../utils/catchErrors"
import mongoose from "mongoose"
import correct from "../utils/validateId"

export const healthCheck = (_: Request, res: Response) => {
      res.status(OK).json({ 
            message: "Users route is up and running" 
      })      
}  
export const getUser = catchErrors( async (req: Request, res: Response) => {
      const { id } = req.params

      if (!correct(id)) {
            return res.status(BAD_REQUEST).json({ 
                  message: "Id not valid" 
            })
      }

      const user = await User.findById(id)

      if (!user) {
            return res.status(NOT_FOUND).json({ 
                  message: "User not found" 
            })
      }

      appAssert(user, NOT_FOUND, 'User not found')
      res.status(OK).json(user)
}
)
export const getAllUsers = catchErrors( async (_: Request, res: Response) => {
      const users = await User.find()

      if (users.length === 0) {
            return res.status(OK).json([])
      }

      appAssert(users, NOT_FOUND, 'Users not found')

      res.status(OK).json(users)
}
)
export const createUser = catchErrors(async (req: Request, res:Response) => {
      const { name, lastName, email } = req.body
      if (!name || !lastName || !email) {
            return res.status(NOT_FOUND).json({
                  message: "All fields are required",
            })
      }
      
      const existingUser = await User.find({email : email})
      if (existingUser.length > 0) {
            return res.status(CONFLICT).json({
                  message: "Email already exists"
            })
      }

      const newUser = await User.create({ name, lastName, email })
      const userID = newUser._id
      appAssert(newUser, BAD_REQUEST, 'User not created')
      await newUser.save()

      res.status(OK).json({message: "User created", userID})
}
)
export const updateUser = catchErrors(async (req: Request, res: Response) => {
      const { id } = req.params

      if (!correct(id)) {
            return res.status(BAD_REQUEST).json({ 
                  message: "Id not valid" 
            })
      }

      const { name, lastName, email } = req.body
      if (!name || !lastName || !email) {
            return res.status(NOT_FOUND).json({
                  message: "All fields are required",
            })
      }

      const existingUser = await User.exists({_id: id})

      if (!existingUser) {
            return res.status(NOT_FOUND).json({
                  message: "User not found",
            })
      }
      const user = await User.findByIdAndUpdate( id , { name, lastName, email })
      appAssert(user, NOT_FOUND, 'User not updated')
      return res.status(OK).json(user)

}
)
export const deleteUser = catchErrors(async (req: Request, res: Response) => {
      const { id } = req.params

      const validId = mongoose.Types.ObjectId.isValid(id)
      if (!validId) {
            return res.status(BAD_REQUEST).json({ 
                  message: "Id not valid" 
            })
      }

      const user = await User.findById(id)
      if (!user) {
            return res.status(NOT_FOUND).json({
                  message: "User not found",
            })
      }
      const deletedUser = await User.findByIdAndDelete(id)
      const userID = deletedUser?._id

      appAssert(deletedUser, NOT_FOUND, 'User not deleted')
      res.status(OK).json({message: "User deleted", id: userID})
}
)