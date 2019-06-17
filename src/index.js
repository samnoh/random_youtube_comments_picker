#!/usr/bin/env node
const program = require('commander');
const dotenv = require('dotenv').config();

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
			})
			.catch(error => {
				console.error(error);
			});
	})
	.parse(process.argv);
