const fs = require('fs');
const dotenv = require('dotenv').config();
const chalk = require('chalk');

const writeStream = fs.createWriteStream('./comments.txt');

const writeFile = ({ winners, candidateSize }) => {
	if (process.env.NO_WINNERS != 'true') {
		writeStream.write(
			`${winners.size} winner${winners.size == 1 ? '' : 's'} of ${candidateSize} candidate${
				candidateSize == 1 ? '' : 's'
			}\n\n-------------------------\n\n`
		);
	}

	winners.forEach(w => {
		if (process.env.HIDE_EMAIL_ON_CONSOLE == 'true') {
			const hideEmail = w.email.replace(/(\w+)@/.exec(w.email)[1].slice(0, 3), '***');
			console.log(chalk.green(`#${w.id} ${w.author} - ${hideEmail}`));
		} else {
			console.log(chalk.green(`#${w.id} ${w.author} - ${w.email}`));
		}

		writeStream.write(
			`#${w.id} ${w.author}\n\n${w.email}\n\n${w.comment.trim()}\n\n-------------------------\n\n`
		);
	});

	return Promise.resolve('Done!');
};

module.exports = writeFile;
