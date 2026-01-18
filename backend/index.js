import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/books", bookRoute);

app.get("/", (req, res) => {
  return res.status(200).send("Hii.. Naleesha");
});

// DB + Server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`);
    });
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });
