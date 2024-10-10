import 'dotenv/config'
import express from "express";
import connectToMongoDB from "./database/connectToDB";
import { PORT, NODE_ENV } from "./api/constants/env";
import userRouter from './api/routes/users';
import activitiesRouter from './api/routes/activities';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/activities", activitiesRouter);

if (require.main === module) { // To avoid starting the server in tests
      app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode.`);
        await connectToMongoDB();
      });
    }