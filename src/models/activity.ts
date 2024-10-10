import mongoose from "mongoose";


export interface IActivity {
      name: string,
      description: string,
      capacity: number,
      suscribers?: mongoose.Types.ObjectId[]
}

const activitySchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      description: {
            type: String,
            required: true
      },
      capacity: {
            type: Number,
            required: true
      },
      suscribers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: []
      }
})

const Activity = mongoose.model<IActivity>("Activity", activitySchema)

export default Activity