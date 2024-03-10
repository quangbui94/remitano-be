import { Request, Response, NextFunction } from "express";
import VideoService from "../services/VideoService";

abstract class IVideoController {
  getAllVideos(req: Request, res: Response): void {}
  shareVideo(req: Request, res: Response): void {}
}

export default class VideoController extends IVideoController {
  public static async getAllVideos(req: Request, res: Response, next: NextFunction) {
    try {
      const allVideos = await VideoService.getAllVideos();
      res.status(200).send(allVideos);
    } catch (error) {
      next(error);
    }
  }

  public static async shareVideo(req: Request, res: Response, next: NextFunction) {
    const { embedId, email } = req.body;
    try {
      const newVideo = await VideoService.createVideo({ embedId, email });
      res.status(200).send(newVideo);
    } catch (error) {
      next(error)
    }
  }
}