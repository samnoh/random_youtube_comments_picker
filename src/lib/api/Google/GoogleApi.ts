import axios, { AxiosResponse } from 'axios';
import { API_KEY } from '../../../util/secrets';

export abstract class GoogleApi<T, K> {
    apiKey: string = `&key=${API_KEY}`;
    baseUrl: string = 'https://www.googleapis.com';

    abstract apiUrl: string;
    abstract data: T;
    abstract save(id?: string): void;
    abstract print(): void;

    async getData(params?: string): Promise<K> {
        const res = await axios.get(this.apiUrl + params + this.apiKey);
        return res.data;
    }

    get(): T {
        return this.data;
    }
}
