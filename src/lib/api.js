const axios = require('axios');
const chalk = require('chalk');

const videoId = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/.exec(
	process.argv[2]
);
const youtubeAPIUrlBase = 'https://www.googleapis.com/youtube/v3';
const youtubeAPIUrlComment = `${youtubeAPIUrlBase}/commentThreads?textFormat=plainText&part=snippet&maxResults=100&videoId=${videoId &&
	videoId[1]}?key=${process.env.API_KEY}`;

const getComments = (nextPageToken = null) => {
	return axios
		.get(`${youtubeAPIUrlComment}${nextPageToken ? '&pageToken=' + nextPageToken : ''}`)
		.then(res => {
			const data = res.data;
			nextPageToken = data.nextPageToken;
			return { items: data.items, nextPageTokenResult: nextPageToken };
		})
		.catch(error => {
			console.error(chalk.bold.red('Youtube API Error: ' + error));
			process.exit(1);
		});
};

module.exports = {
	getComments
};
