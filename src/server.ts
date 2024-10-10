import express, { Express } from "express";
import 'dotenv/config'

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());

app.use("/", );

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});