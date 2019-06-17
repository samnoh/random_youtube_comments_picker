const chalk = require('chalk');

const pickWinners = candidates => {
	const winners = new Map();
	const keysArr = Array.from(candidates.keys());

	if (candidates.size < process.env.NUMBER_OF_WINNERS) {
		return Promise.reject('Error: the number of winners is more than comments');
	}

	while (winners.size < process.env.NUMBER_OF_WINNERS) {
		const ranIndex = parseInt(Math.random() * candidates.size, 10);
		const winner = keysArr[ranIndex];

		winners.set(winner, { author: winner, ...candidates.get(winner) });
	}

	return Promise.resolve({ winners, candidateSize: candidates.size });
};

module.exports = pickWinners;
