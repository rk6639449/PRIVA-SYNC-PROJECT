import express from "express";
import cors from "cors";
const app = express(); 
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173" // your frontend URL
}));

import userRouter from './routes/user.route.js'
import chatRouter from './routes/chat.route.js'
//route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);



//example route: http://localhost:4000/api/v1/users/register

export default app;