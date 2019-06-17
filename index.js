const dotenv = require('dotenv').config();

const processComments = require('./processComments');
const pickWinners = require('./pickWinners');
const writeFile = require('./writeFile');

processComments()
	.then(candidates => {
		if (process.env.NO_WINNERS == 'true') {
			return { winners: candidates, candidateSize: candidates.size };
		}
		return pickWinners(candidates);
	})
	.then(winners => writeFile(winners))
	.then(message => {
		console.log(message);
	})
	.catch(error => {
		console.error(error);
	});
