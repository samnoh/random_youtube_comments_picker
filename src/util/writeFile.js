const fs = require('fs');
const path = require('path');

const filepath = path.join(process.cwd(), `comments-${Date.now()}.txt`);

const writeFile = ({ winners, candidateSize }) => {
	if (process.argv[3]) {
		fs.writeFileSync(
			filepath,
			`${winners.size} winner${winners.size == 1 ? '' : 's'} of ${candidateSize} candidate${
				candidateSize == 1 ? '' : 's'
			}\n\n-------------------------\n\n`,
			err => {
				if (err) Promise.reject('Error: writeFileSync');
			}
		);
	}

	winners.forEach(w => {
		fs.appendFileSync(
			filepath,
			`#${w.id} ${w.author}\n\n${
				w.email ? w.email + '\n\n' : ''
			}${w.comment.trim()}\n\n-------------------------\n\n`,
			err => {
				if (err) Promise.reject('Error: appendFile');
			}
		);
	});

	return Promise.resolve('Done!');
};

module.exports = writeFile;
