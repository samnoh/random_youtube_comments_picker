const dotenv = require('dotenv').config();
const chalk = require('chalk');

const processComments = require('./processComments');
const pickWinners = require('./pickWinners');
const writeFile = require('./writeFile');

if (process.argv.length == 3) {
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
} else console.error(chalk.bold.red('No Youtube URL'));
