import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/errorMiddleware.js";
import githubRoutes from "./routes/githubRoutes.js";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
const app=express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/github", githubRoutes);

// app.get("/",(req,res)=>{
//     res.send("API running");
// });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
app.use(errorMiddleware);