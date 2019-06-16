const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv').config();

const writeStream = fs.createWriteStream('./comments.txt');
const videoId = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/.exec(
	process.env.VIDEO_URL
);
const youtubeAPIUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${
	process.env.API_KEY
}&textFormat=plainText&part=snippet&videoId=${videoId && videoId[1]}&maxResults=100`;
const candidates = new Map();

const getComments = async (nextPageToken = null) => {
	await axios
		.get(`${youtubeAPIUrl}${nextPageToken ? '&pageToken=' + nextPageToken : ''}`)
		.then(res => {
			const data = res.data;
			nextPageToken = data.nextPageToken;
			return data.items;
		})
		.then(items => {
			return items.map(i => {
				const author = i.snippet.topLevelComment.snippet.authorDisplayName;
				const comment = i.snippet.topLevelComment.snippet.textDisplay;
				const email = /\w+@\w+\.\w+/g.exec(comment);

				if (!candidates.has(author) && (process.env.FILTER_NULL_EMAIL == 'true' ? email : true)) {
					candidates.set(author, { email: email && email[0], comment });
				}
			});
		})
		.catch(error => {
			console.error(error);
		});

	if (!nextPageToken) return new Promise((resolve, reject) => resolve());
	return getComments(nextPageToken);
};

getComments()
	.then(() => {
		const winners = new Map();
		const keysArr = Array.from(candidates.keys());

		if (candidates.size < process.env.NUMBER_OF_WINNERS) {
			return new Promise((resolve, reject) =>
				reject('Error: the number of winners is more than comments')
			);
		}

		while (winners.size < process.env.NUMBER_OF_WINNERS) {
			const ranIndex = parseInt(Math.random() * candidates.size);
			const winner = keysArr[ranIndex];

			winners.set(winner, { author: winner, ...candidates.get(winner) });
		}

		return winners;
	})
	.then(winners => {
		writeStream.write(`${winners.size} of ${candidates.size}\n\n-------------------------\n\n`);

		winners.forEach(w => {
			console.log(`${w.author} - ${w.email}`);
			writeStream.write(
				`${w.author}\n\n${w.email}\n\n${w.comment.trim()}\n\n-------------------------\n\n`
			);
		});
	})
	.catch(error => {
		console.error(error);
	});
