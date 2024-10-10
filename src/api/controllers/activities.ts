import { Request, Response } from "express"
import Activity from "../../models/Activity"
import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from "../constants/http"
import catchErrors from "../utils/catchErrors"
import mongoose from "mongoose"
import appAssert from "../utils/appAssert"
import correct from "../utils/validateId"

export const healthCheck = (_: Request, res: Response) => {
      res.status(OK).json({ 
            message: "Activities route is up and running" 
      })
}
export const getActivities = catchErrors(async (_: Request, res: Response) => {
      
      const activities = await Activity.find()
      if (activities.length === 0) {
            return res.status(OK).json([])
      }

      res.status(OK).json(activities)
}
)

export const createActivity = catchErrors(async (req: Request, res: Response) => {
      
      const { name, description, capacity } = req.body

      if (!name || !description || !capacity) {
            return res.status(CONFLICT).json({ 
                  message: "All fields are required" 
            })
      }

      const existingActivity = await Activity.findOne({ name })
      if (existingActivity) {
            return res.status(CONFLICT).json({ 
                  message: "Activity name already exists" 
            })
      }

      const activity = await Activity.create({ 
            name, 
            description, 
            capacity 
      })
      const activityId = activity._id
      await activity.save()

      res.status(OK).json({_id: activityId})
}
)

export const getActivity = catchErrors(async (req: Request, res: Response) => {
      const { id } = req.params

      const validId = mongoose.Types.ObjectId.isValid(id)
      if (!validId) {
            return res.status(BAD_REQUEST).json({ 
                  message: "Id not valid" 
            })
      }

      const activity = await Activity.findById(id)
      if (!activity) {
            return res.status(OK).json({ 
                  message: "Activity not found" 
            })
      }
 
      appAssert(activity, NOT_FOUND, 'Activity not found')
      res.status(OK).json(activity)
}
)

export const subscribeActivity = catchErrors(async (req: Request, res: Response) => {  
      const { id } = req.params  
      const { name } = req.body 
      if (!correct(id)) {
            return res.status(BAD_REQUEST).json({ 
                  message: "Id not valid" 
            })
      }

      const activityName = name.toLowerCase()
      const existingActivity = await Activity.findOne({
            name: new RegExp(`^${activityName}$`, 'i')
          })

      if (!existingActivity) {
            return res.status(NOT_FOUND).json({ 
                  message: "Activity not found" 
            })
      }

      const subscriber = new mongoose.Types.ObjectId(id)
      if (existingActivity.suscribers?.includes(subscriber)) {
            return res.status(CONFLICT).json({
                  message: "User already subscribed"
            })
      }
      
      if (existingActivity.capacity === existingActivity.suscribers?.length) {
            return res.status(CONFLICT).json({
                  message: "Activity is full"
            })
      }

      existingActivity.suscribers?.push(subscriber)
      await existingActivity.save()


      res.status(OK).json({
            message: "User subscribed",
            activity: existingActivity.name      
      })
})

export const deleteActivity = catchErrors(async (req: Request, res: Response) => {
      const { id } = req.params

      const validId = mongoose.Types.ObjectId.isValid(id)
      if (!validId) {
            return res.status(BAD_REQUEST).json({ 
                  message: "Id not valid" 
            })
      }
      const activity = await Activity.findById(id)
      if (!activity) {
            return res.status(NOT_FOUND).json({
                  message: "Activity not found",
            })
      }

      const deletedActivity = await Activity.findByIdAndDelete(id)
      const activityID = deletedActivity?._id

      appAssert(activityID, BAD_REQUEST, 'Activity not deleted')

      res.status(OK).json(activityID)
}
)

export const unSubscribeActivity = catchErrors(async (req: Request, res: Response) => {
      const { id } = req.params  
      const { name } = req.body 
      if (!correct(id)) {
            return res.status(BAD_REQUEST).json({ 
                  message: "Id not valid" 
            })
      }

      const activityName = name.toLowerCase()
      const existingActivity = await Activity.findOne({
            name: new RegExp(`^${activityName}$`, 'i')
          })

      if (!existingActivity) {
            return res.status(NOT_FOUND).json({ 
                  message: "Activity not found" 
            })
      }

      const unSubscriber = new mongoose.Types.ObjectId(id)

      const indexOf = existingActivity.suscribers?.indexOf(unSubscriber)
      if (indexOf === undefined) {
             return res.status(CONFLICT).json({
                  message: "User not found"
            })
      }else if (indexOf === -1) {
            return res.status(CONFLICT).json({
                  message: "User not subscribed"
            })
      }

      const unSubscribed = existingActivity.suscribers?.splice(indexOf, 1)
      await existingActivity.save()

      res.status(OK).json({
            message: `User ${unSubscribed} has been unsubscribed from ${existingActivity.name}`, 
      })

})