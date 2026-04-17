import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'; //import authRoutes from '../Server/routes/auth.js'
import auth from '../Server/routes/auth.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())
app.use('/api/auth', auth)

//connect to database
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch((error) => {
        console.error('error connecting to database:', error);
    })
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
})