const pickWinners = require('./pickWinners');
const processComments = require('./processComments');

processComments()
	.then(candidates => pickWinners(candidates))
	.then(message => console.log(message));
