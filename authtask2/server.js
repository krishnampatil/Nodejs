require("dotenv").config();

const express = require("express");
const connectDB = require('./config/db')

const app = express();

connectDB();

app.use(express.json());

app.use(
"/api/auth",
require("./routes/authRoutes")
);

const PORT = process.env.PORT || 5000;

app.listen(
process.env.PORT,
()=>{
    console.log("Server Running");
}
);