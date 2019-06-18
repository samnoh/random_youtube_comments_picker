#!/usr/bin/env node
const path = require('path');
const program = require('commander');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const processComments = require('./util/processComments');
const pickWinners = require('./util/pickWinners');
const writeFile = require('./util/writeFile');

program
	.version('0.0.1', '-v, --version')
	.action(() => {
		processComments()
			.then(candidates => {
				if (process.argv[3]) {
					return pickWinners(candidates);
				}
				return { winners: candidates, candidateSize: candidates.size };
			})
			.then(winners => writeFile(winners))
			.then(message => {
				console.log(message);
				process.exit(0);
			})
			.catch(error => {
				console.error(error);
			});
	})
	.parse(process.argv);

setTimeout(() => {
	console.error('Error: timeout');
	process.exit(1);
}, 180000); // 3 minutes
