import "dotenv/config";
import "reflect-metadata";
import "@models/index";
import http from 'http';
import { Server } from 'socket.io';

import cors from "cors";
import express, { Request, Response } from "express";

import connection from "@models/index";
import AuthRouter from "@routes/Auth";
import VideoRouter from "@routes/Video";

import ErrorHandler from "@middlewares/errorMiddleware";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5000;

const start = async () => {
  // Handle WebSocket connections
  io.on('connection', (socket) => {
    console.log('WebSocket client connected');

    // Handle video sharing event
    socket.on('shareVideo', (data) => {
      console.log('Video shared:', data);
      // Broadcast notification to all connected clients
      io.emit('videoShared', data);
    });

    socket.on('connection', (data) => {
      console.log('Video shared:', data.message);
    });
  });
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
    server.listen(port, () => {
      console.log(`Server started at ${port}.`);
    });
  } catch (error) {
    console.error(error);
  }
};

void start();
