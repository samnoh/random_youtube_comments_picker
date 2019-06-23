#!/usr/bin/env node
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const processComments = require('./util/processComments');
const pickWinners = require('./util/pickWinners');
const writeFile = require('./util/writeFile');

processComments()
	.then(candidates => {
		if (process.argv[3]) {
			return pickWinners(candidates);
		}
		return { winners: candidates, candidateSize: candidates.size };
	})
	.then(winners => writeFile(winners))
	.then(message => {
		console.log(message + '\nbye...');
		process.exit(0);
	})
	.catch(error => {
		console.error(error);
	});

setTimeout(() => {
	console.error('Error: timeout');
	process.exit(1);
}, 3 * 60 * 1000); // 3 minutes
