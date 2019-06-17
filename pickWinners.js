const fs = require('fs');
const dotenv = require('dotenv').config();
const writeStream = fs.createWriteStream('./comments.txt');

const pickWinners = candidates => {
	const winners = new Map();
	const keysArr = Array.from(candidates.keys());

	if (candidates.size < process.env.NUMBER_OF_WINNERS) {
		return Promise.reject('Error: the number of winners is more than comments');
	}

	while (winners.size < process.env.NUMBER_OF_WINNERS) {
		const ranIndex = parseInt(Math.random() * candidates.size);
		const winner = keysArr[ranIndex];

		winners.set(winner, { author: winner, ...candidates.get(winner) });
	}

	writeStream.write(`${winners.size} of ${candidates.size} \n\n-------------------------\n\n`);

	winners.forEach(w => {
		if (process.env.HIDE_EMAIL_ON_CONSOLE == 'true') {
			let hideEmail = w.email.replace(/(\w+)@/.exec(w.email)[1].slice(0, 3), '***');
			console.log(`#${w.id} ${w.author} - ${hideEmail}`);
		} else {
			console.log(`#${w.id} ${w.author} - ${w.email}`);
		}

		writeStream.write(
			`#${w.id} ${w.author}\n\n${w.email}\n\n${w.comment.trim()}\n\n-------------------------\n\n`
		);
	});

	return Promise.resolve('Done');
};

module.exports = pickWinners;
