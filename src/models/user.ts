import mongoose from "mongoose"

interface IUser extends mongoose.Document {
      name: string
      lastName: string
      email: string
}

const userSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      lastName: {
                  type: String,
                  required: true
            },
      email: {
            type: String,
            required: true
      },
})

const User = mongoose.model<IUser>("User", userSchema)

export default User