import "dotenv/config";
import "reflect-metadata";
import "@models/index";

import cors from "cors";
import express, { Request, Response } from "express";

import connection from "@models/index";
import AuthRouter from "@routes/Auth";
import VideoRouter from "@routes/Video";

import ErrorHandler from "@middlewares/errorMiddleware";

const app = express();

const port = process.env.PORT || 5000;

const start = async () => {
  //Middlewares
  app.use(express.json());
  app.use(cors());

  //Routes
  app.use("/auth", AuthRouter);
  app.use("/videos", VideoRouter);

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
  });

  app.use(ErrorHandler);

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
