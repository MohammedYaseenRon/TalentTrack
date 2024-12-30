import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import authRoute from "./routes/authRoute";
import projectRoute from "./routes/projectRoutes"
import ratingRoute  from   "./routes/ratingRoute"
import commentRoute  from   "./routes/commentRoute"
import jobRoute from  "./routes/jobRoute"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); 
app.use(cors({
    origin: "http://localhost:3000",  
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
})

app.use("/auth", authRoute)
app.use("/project", projectRoute)
app.use("/comment", commentRoute);
app.use("/rating",  ratingRoute);
app.use("/jobs", jobRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

