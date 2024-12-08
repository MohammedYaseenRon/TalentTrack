import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoute from "./routes/userRoute"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
})

app.use("/auth", userRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

