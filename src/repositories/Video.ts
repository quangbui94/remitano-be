import Video from '@models/Video';

export default class VideoRepository {
    private Video: typeof Video;
  
    constructor() {
      this.Video = Video;
    }

    static async getAllVideos(): Promise<Video[]> {
        return await Video.findAll();
    }
  
    static async createVideo({embedId, title, owner, description}: VideoInput): Promise<Video> {
      return await Video.create({ embedId, title, owner, description });
    }
  
    static async getVideoByOwner(owner: string): Promise<Video | null> {
      return await Video.findByPk(owner);
    }
}