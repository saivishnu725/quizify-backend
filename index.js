//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//path
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.use('/auth', authRoutes);

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});