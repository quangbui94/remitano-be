import { Request, Response } from "express";
import VideoService from "../services/VideoService";

abstract class IVideoController {
  getAllVdieos(req: Request, res: Response): void {}
}

export default class VideoController extends IVideoController {
  public static async getAllVdieos(req: Request, res: Response) {
    return VideoService.getAllVideos();
  }
}