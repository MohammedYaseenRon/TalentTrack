import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

