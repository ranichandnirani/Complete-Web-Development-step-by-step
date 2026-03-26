import express from "express";
import cors from "cors";
import cookeiParser from "cookie-parser";

const app = express();

// app.use for middleware
// basic configurations

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookeiParser())

// cors configuration
app.use(cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",  //for vite application

        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        // Allow headers
        allowedHeaders: ["Authorization", "Content-Type"]
    }),
);

// import the route

import healthCheckRouter from "./routes/healthcheck.routes.js";

import authRouter from "./routes/auth.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res)=> {
    res.send("Welcome to basecampy!");
});

export default app;
