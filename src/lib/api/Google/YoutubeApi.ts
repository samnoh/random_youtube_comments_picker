import { Comments } from './Comments';

export class YoutubeApi {
    static async getComments(videoId: string): Promise<any> {
        const comment = new Comments();
        await comment.save(videoId);
        return comment.get();
    }

    static async getAndPrintComments(videoId: string): Promise<void> {
        const comment = new Comments();
        await comment.save(videoId);
        comment.print();
    }
}
