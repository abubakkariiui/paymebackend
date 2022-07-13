import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import agentRoutes from './routes/agentRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from './routes/contactRoutes.js'
import employeRoutes from './routes/employeRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
import csr from './routes/csr.js'
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.use("/api/users", userRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/employe", employeRoutes);
app.use("/api/history",historyRoutes);
app.use("/api/csr",csr);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
