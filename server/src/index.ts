import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import authRoute from "./routes/authRoute";
import projectRoute from "./routes/projectRoutes"


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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

