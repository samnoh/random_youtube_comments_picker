import chalk from 'chalk';

import { ApiUrl } from './ApiUrl';
import { GoogleApi } from './GoogleApi';

type items = { [key: string]: any }[];

export class Comments extends GoogleApi {
    apiUrl: string = `${this.baseUrl}/youtube/v3`;
    data: items = [];

    async save(videoId: string): Promise<void> {
        try {
            const res = await this.getData(`${ApiUrl.COMMENTS}${videoId}`);
            this.data = res.items;
        } catch (e) {
            console.error(chalk.bold.red('Youtube API Error: ' + e));
        }
    }

    print(): void {
        this.data.map(comment => {
            const snippet = comment.snippet.topLevelComment.snippet;
            console.log(`${snippet.authorDisplayName} - ${snippet.textDisplay}`);
        });
    }
}
