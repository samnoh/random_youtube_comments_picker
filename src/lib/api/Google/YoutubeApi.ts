import { Comments } from './Comments';

export class YoutubeApi {
    static getAndPrintComments(videoId: string): void {
        new Comments().get(videoId).then(comments => comments.print());
    }
}
