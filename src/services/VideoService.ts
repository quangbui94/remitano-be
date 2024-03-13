import VideoRepository from "../repositories/Video";
import { InteralError } from "../shared/ErrorCustom";
import axios from "axios";

abstract class IVideoService {
    getAllVideos(): any { }
}

interface VideoCreateInput {
    embedId: string;
    email: string;
}

export default class AuthService extends IVideoService {
    public static async getAllVideos() {
        return await VideoRepository.getAllVideos();
    }

    public static async createVideo({ embedId, email }: VideoCreateInput) {
        try {
            const videoInfos = await axios({
                method: 'get',
                url: `https://www.googleapis.com/youtube/v3/videos?id=${embedId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!videoInfos) {
                throw new InteralError('Something is wrong');
            }
            const { title, description } = videoInfos.data.items[0].snippet;
            const newVideo = await VideoRepository.createVideo({ embedId, title, owner: email, description });

            if (!newVideo) {
                throw new InteralError('Cant share video');
            }
            return newVideo;
        } catch (error: any) {
            throw error;
        }
    }
}
