import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send("Hello World!");
});

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDB connection failed');
    }
}

app.use(express.json());

app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port : ${port}`);
});
