const fs = require('fs');
const chalk = require('chalk');

const writeStream = fs.createWriteStream('./comments.txt');

const writeFile = ({ winners, candidateSize }) => {
	writeStream.write(
		`${winners.size} winner${winners.size == 1 ? '' : 's'} of ${candidateSize} candidate${
			candidateSize == 1 ? '' : 's'
		}\n\n-------------------------\n\n`
	);

	winners.forEach(w => {
		writeStream.write(
			`#${w.id} ${w.author}\n\n${w.email}\n\n${w.comment.trim()}\n\n-------------------------\n\n`
		);
	});

	writeStream.close();
	return Promise.resolve('Done!');
};

module.exports = writeFile;
