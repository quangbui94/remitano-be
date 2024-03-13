import Video from 'models/Video';
import { BadRequest } from 'shared/ErrorCustom';

export default class VideoRepository {
    private Video: typeof Video;
  
    constructor() {
      this.Video = Video;
    }

    static async getAllVideos(): Promise<Video[]> {
        return await Video.findAll();
    }
  
    static async createVideo({embedId, title, owner, description}: VideoInput): Promise<Video> {
      const isVideoShared = await Video.findOne({ where: { embedId, owner } });
      if (isVideoShared) {
        throw new BadRequest('You already shared this video');
      }
      return await Video.create({ embedId, title, owner, description });
    }
  
    static async getVideoByOwner(owner: string): Promise<Video | null> {
      return await Video.findByPk(owner);
    }
}