import "dotenv/config";
import "reflect-metadata";
import "@models/index";

import cors from "cors";
import express, { Request, Response } from "express";

import connection from "@models/index";
import AuthRouter from "@routes/Auth";
import VideoRouter from "@routes/Video";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

//Routes
app.use("/auth", AuthRouter);
app.use("/videos", VideoRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connection.sync();
    app.listen(port, () => {
      console.log(`Server started at ${port}.`);
    });
  } catch (error) {
    console.error(error);
  }
};

void start();
