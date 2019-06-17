const axios = require('axios');
const dotenv = require('dotenv').config();
const chalk = require('chalk');

const videoId = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/.exec(
	process.env.VIDEO_URL
);
const youtubeAPIUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${
	process.env.API_KEY
}&textFormat=plainText&part=snippet&videoId=${videoId && videoId[1]}&maxResults=100`;

const getComments = (nextPageToken = null) => {
	return axios
		.get(`${youtubeAPIUrl}${nextPageToken ? '&pageToken=' + nextPageToken : ''}`)
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
