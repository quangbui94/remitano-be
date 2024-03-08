import VideoRepository from "@repositories/Video";

abstract class IVideoService {
    getAllVideos(): any { }
}

export default class AuthService extends IVideoService {
    public static async getAllVideos() {
        return VideoRepository.getAllVideos();
    }

    public static async createVideo({ embedId, title, owner, description }: VideoInput) {
        return VideoRepository.createVideo({ embedId, title, owner, description });
    }

    public static async getVideoByOwner(owner: string) {
        return VideoRepository.getVideoByOwner(owner);
    }
}
