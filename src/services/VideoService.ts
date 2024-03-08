import VideoRepository from "@repositories/Video";

abstract class IVideoService {
    getAllVideos(): any { }
}

export default class AuthService extends IVideoService {
    public static async getAllVideos() {
        return await VideoRepository.getAllVideos();
    }

    public static async createVideo({ embedId, title, owner, description }: VideoInput) {
        return await VideoRepository.createVideo({ embedId, title, owner, description });
    }

    public static async getVideoByOwner(owner: string) {
        return await VideoRepository.getVideoByOwner(owner);
    }
}
