import { Comments } from './Comments';

export class YoutubeApi {
    static async getAndPrintComments(videoId: string): Promise<void> {
        const comment = new Comments();
        await comment.save(videoId);
        comment.print();
    }
}
