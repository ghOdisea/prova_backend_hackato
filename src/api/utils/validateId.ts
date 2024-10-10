import mongoose from "mongoose"

const correct = (id: string) =>  mongoose.Types.ObjectId.isValid(id)

export default correct