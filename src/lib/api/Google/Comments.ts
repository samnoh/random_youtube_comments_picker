import chalk from 'chalk';

import { ApiUrl } from './ApiUrl';
import { GoogleApi } from './GoogleApi';

export class Comments extends GoogleApi {
    apiUrl: string = `${this.baseUrl}/youtube/v3`;
    data: { [key: string]: any } = [];

    async get(videoId: string): Promise<Comments> {
        try {
            const res = await this.getData(`${ApiUrl.COMMENTS}${videoId}`);
            this.data = res.items;
            return this;
        } catch (e) {
            console.error(chalk.bold.red('Youtube API Error: ' + e));
        }
    }

    print(): void {
        this.data.map(comment => {
            const snippet = comment.snippet.topLevelComment.snippet;
            console.log(snippet.textDisplay);
        });
    }
}
