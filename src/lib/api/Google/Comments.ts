import chalk from 'chalk';

import { ApiUrl } from './ApiUrl';
import { GoogleApi } from './GoogleApi';

interface CommentText {
    authorDisplayName: string;
    textDisplay: string;
}

interface Item {
    snippet: {
        topLevelComment: {
            snippet: CommentText;
        };
    };
}

export class Comments extends GoogleApi<string[], any> {
    apiUrl: string = `${this.baseUrl}/youtube/v3${ApiUrl.COMMENTS}`;
    data: string[] = [];

    async save(videoId: string): Promise<void> {
        try {
            let nextPagetoken: string = '';
            videoId = this.getVideoId(videoId);

            do {
                const url = `${videoId}${nextPagetoken ? '&pageToken=' + nextPagetoken : ''}`;
                const res = await this.getData(url);
                res.items.map((item: Item) => {
                    const snippet: CommentText = item.snippet.topLevelComment.snippet;
                    this.data.push(`${snippet.authorDisplayName} - ${snippet.textDisplay}`);
                });

                nextPagetoken = res.nextPageToken;
            } while (nextPagetoken);
        } catch (e) {
            console.error(chalk.bold.red('Comments Error: ' + e));
        }
    }

    print(): void {
        this.data.map((comment: string) => {
            console.log(comment);
        });
    }

    getVideoId(url: string): string {
        return /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/.exec(
            url
        )[1];
    }
}
