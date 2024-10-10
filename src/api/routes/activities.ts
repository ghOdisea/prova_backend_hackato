import express from 'express'
import { createActivity, getActivities } from "../controllers/activities";
import { healthCheck } from '../controllers/activities';


const activitiesRouter = express.Router()

activitiesRouter.get("/health", healthCheck)

activitiesRouter.get("/all", getActivities)
activitiesRouter.post("/", createActivity)
// activitiesRouter.patch("/:id", updateActivity)
// activitiesRouter.get("/:id", getActivity)
// activitiesRouter.delete("/:id", deleteActivity)

export default activitiesRouter