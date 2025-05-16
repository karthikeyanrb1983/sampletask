/** @format */

import express from "express";
import { AppDataSource } from "./data-source";
const app = express();
const port = 3000;

import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import taskRoutes from "./routes/task.routes";

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/chat", chatRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("MySQL Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
