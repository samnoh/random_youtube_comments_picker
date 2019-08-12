import { YoutubeApi, Summary } from './lib';

YoutubeApi.getComments('5r0ZQmVj42I').then((data: string[]) => {
    Summary.randomSelectWithConsoleReport(data).buildAndPrintReport(2);
});
