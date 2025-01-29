const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const axios = require("axios");
const cors = require("cors");
const router = require("./router.js");

dotenv.config();

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

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

app.use("/api/", router);

app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port : ${port}`);
});
