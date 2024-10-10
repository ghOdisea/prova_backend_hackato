import mongoose from "mongoose";


export interface IActivity {
      name: string;
      description: string;
      capacity: number;
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
      }
})

const Activity = mongoose.model<IActivity>("Activity", activitySchema);

export default Activity