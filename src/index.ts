#!/usr/bin/env node
import { YoutubeApi, Summary } from './lib';
import { url, nWinners } from './util';

YoutubeApi.getComments(url).then((data: string[]) => {
    Summary.randomSelectWithConsoleReport(data, nWinners);
});
