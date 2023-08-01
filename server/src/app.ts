// console.log("Bài nâng cao");

import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
const app = express();
import studentRoute from "./routes/student.routes";

// middlewware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// router
app.use("/apis/v1/students", studentRoute);

export default app;
