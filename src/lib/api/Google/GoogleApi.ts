import axios, { AxiosResponse } from 'axios';
import { API_KEY } from '../../../util/secrets';

export abstract class GoogleApi {
    apiKey: string = `&key=${API_KEY}`;
    baseUrl: string = 'https://www.googleapis.com';

    abstract apiUrl: string;

    getData(params?: string): Promise<any> {
        return axios.get(this.apiUrl + params + this.apiKey).then((res: AxiosResponse) => res.data);
    }
}
