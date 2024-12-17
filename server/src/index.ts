import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import authRoute from "./routes/authRoute";
import projectRoute from "./routes/projectRoutes"


dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
})

app.use("/auth", authRoute)
app.use("/project", projectRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

