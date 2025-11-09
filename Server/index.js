import express from "express";
import cors from "cors";
import { dbConnect } from "./Db/dbconnect.js";
import candidateRouter from "./Router/Candidate/candidateRouter.js";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use("/candidate/api", candidateRouter);
app.use("/candidate_uploads", express.static("candidate_uploads"));

const PORT = process.env.PORT || 4000;

try {
  await dbConnect(); 
  app.listen(PORT, () => console.log("Server running on port"));
} catch (err) {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
}