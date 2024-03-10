import { Request, Response } from "express";
import VideoService from "../services/VideoService";

abstract class IVideoController {
  getAllVideos(req: Request, res: Response): void {}
}

export default class VideoController extends IVideoController {
  public static async getAllVideos(req: Request, res: Response) {
    const allVideos = await VideoService.getAllVideos();
    res.status(200).send(allVideos);
  }

  public static async shareVideo(req: Request, res: Response) {
    const { embedId, email } = req.body;
    const newVideo = await VideoService.createVideo({ embedId, email });
    res.status(200).send(newVideo);
  }
}