import express from 'express'
import { createActivity, deleteActivity, getActivities, getActivity, subscribeActivity, unSubscribeActivity } from "../controllers/activities";
import { healthCheck } from '../controllers/activities';


const activitiesRouter = express.Router()

activitiesRouter.get("/health", healthCheck)

activitiesRouter.get("/all", getActivities)
activitiesRouter.get("/:id", getActivity)
activitiesRouter.post("/", createActivity)
activitiesRouter.patch("/subscribe/:id", subscribeActivity)
activitiesRouter.patch("/unsubscribe/:id", unSubscribeActivity)
activitiesRouter.delete("/:id", deleteActivity)

export default activitiesRouter