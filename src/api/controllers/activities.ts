import { Request, Response } from "express"
import Activity from "../../models/Activity"
import { NOT_FOUND, OK } from "../constants/http"

export const healthCheck = (_: Request, res: Response) => {
      res.status(OK).json({ 
            message: "Activities route is up and running" 
      })
}
export const getActivities = async (_: Request, res: Response) => {
      
      const activities = await Activity.find()
      if (activities.length === 0) {
            res.status(OK).json({ message: "No activities found" })
      }

      res.status(OK).json(activities)
}

export const createActivity = async (req: Request, res: Response) => {
      
      const { name, description, capacity } = req.body
      if (!name || !description || !capacity) {
            res.status(OK).json({ 
                  message: "All fields are required" 
            })
      }

      const activity = await Activity.create({ 
            name, 
            description, 
            capacity 
      })
      await activity.save()

      res.status(OK).json(activity)
}

export const getActivity = async (req: Request, res: Response) => {
      
      const id = req.params.id
      const activity = await Activity.findById(id)
      if (!activity) {
            res.status(OK).json({ 
                  message: "Activity not found" 
            })
      }
 
      res.status(OK).json(activity)
}

export const updateActivity = async (req: Request, res: Response) => {  
      
      const id = req.params.id    
      const existingActivity = await Activity.findById(id)
      if (!existingActivity) {
            res.status(NOT_FOUND).json({ 
                  message: "Activity not found" 
            })
      }

      const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true })
      if (!updatedActivity) {
            res.status(NOT_FOUND).json({ 
                  message: "There was a problem updating the activity" 
            })
      }

      res.status(OK).json(updatedActivity)
}

export const deleteActivity = async (req: Request, res: Response) => {
      
      const id = req.params.id
      const deletedActivity = await Activity.findByIdAndDelete(id)
      if (!deletedActivity) {
            res.status(NOT_FOUND).json({ 
                  message: "Activity not found" 
            })
      }

      res.status(OK).json(deletedActivity)
}