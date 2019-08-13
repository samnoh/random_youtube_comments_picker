import axios, { AxiosResponse } from 'axios';
import chalk from 'chalk';

import { API_KEY } from '../../../util';

export abstract class GoogleApi<T, K> {
    apiKey: string = `&key=${API_KEY}`;
    baseUrl: string = 'https://www.googleapis.com';

    abstract apiUrl: string;
    abstract data: T;
    abstract save(id?: string): void;
    abstract print(): void;

    async getData(params?: string): Promise<K> {
        try {
            const res: AxiosResponse = await axios.get(this.apiUrl + params + this.apiKey);
            return res.data;
        } catch (e) {
            console.error(chalk.bold.red('Api Request Error: ' + e));
            process.exit(1);
        }
    }

    get(): T {
        return this.data;
    }
}
