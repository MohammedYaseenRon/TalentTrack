import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { WebSocketServer, WebSocket } from "ws"; // Import WebSocket types
import http from "http"

import authRoute from "./routes/authRoute";
import projectRoute from "./routes/projectRoutes"
import ratingRoute from "./routes/ratingRoute"
import commentRoute from "./routes/commentRoute"
import jobRoute from "./routes/jobRoute"
import userRoute from "./routes/userRoute"
import applicationRoute from "./routes/applicationRoutes"
import interviewRoutes from "./routes/interviewRoutes"
import path from "path";



dotenv.config();


const app = express();
const server = http.createServer(app);
const port = Number(process.env.PORT) || 4001;

export const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
    console.log("New WebSocket connection established");

    ws.on("message", (message: string) => {
        console.log(`Recieve message: ${message}`);

    });
    ws.on("close", () => {
        console.log("Websocket connection lost");

    });
})

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: ["http://localhost:3000","https://talent-track-liard.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
})

app.use("/auth", authRoute)
app.use("/project", projectRoute)
app.use("/comment", commentRoute);
app.use("/rating", ratingRoute);
app.use("/jobs", jobRoute);
app.use("/user", userRoute);
app.use("/application", applicationRoute);
app.use("/interview", interviewRoutes)


app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
  
