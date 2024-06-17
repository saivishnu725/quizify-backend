//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: true, // Allow all origins temporarily
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    AccessControlAllowCredentials: true,
    credentials: true
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.options('*', cors());

app.use(express.json());

const frontend_url = process.env.FRONTEND || "http://localhost:4000";
console.log("Frontend: ", frontend_url);

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

app.use("/auth", authRoutes);

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
