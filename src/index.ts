//This is the main entry point for the FAI agent platform server.

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { chatRouter } from "./api/chat"

//This loads environment variables from .env for in-app use. 
dotenv.config();

//This creates an instance of the express app.
const app = express();

//This sets the port for the server to listen to.
const PORT = process.env.PORT || 3001;

//This sets up CORS to allow requests from the specified origin.
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";

//This applies the CORS middleware for the specified origin.
app.use(
    cors({
        origin: allowedOrigin,
    })
);

//The express middleware to parse JSON requests. 
app.use(express.json());

//This is a health checkpoiint to verify the server is running and responsive. 
app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "fai-agent-platform" });
});

//This mounts the chatRouter to handle all routes starting with / chat. 
app.use("/chat", chatRouter);

app.listen(PORT, () => {
    console.log(`FAI agent platform running on port ${PORT}`);
});