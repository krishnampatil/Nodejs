const express = require("express");
const path = require("path");


const mongoose = require("mongoose");

const connectDB = require("./config/db");

const fileRoutes = require("./routes/fileRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/uploads", express.static("src/uploads"));

app.use("/api", fileRoutes);

app.use(express.static(path.join(__dirname, "../public")));


module.exports = app;