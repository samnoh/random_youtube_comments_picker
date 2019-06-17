const chalk = require('chalk');

const pickWinners = candidates => {
	const numOfWinners = process.argv[3];
	const winners = new Map();
	const keysArr = Array.from(candidates.keys());

	if (candidates.size < numOfWinners) {
		return Promise.reject('Error: the number of winners is more than comments');
	}

	while (winners.size < numOfWinners) {
		const ranIndex = parseInt(Math.random() * candidates.size, 10);
		const winner = keysArr[ranIndex];

		winners.set(winner, { author: winner, ...candidates.get(winner) });
	}

	return Promise.resolve({ winners, candidateSize: candidates.size });
};

module.exports = pickWinners;
