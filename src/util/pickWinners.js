const chalk = require('chalk');

const pickWinners = candidates => {
    const numOfWinners = process.argv[3];
    const winners = new Map();
    const keysArr = Array.from(candidates.keys());

    if (candidates.size < numOfWinners) {
        return Promise.reject('Error: the number of winners is more than comments');
    }

    while (winners.size < numOfWinners) {
        const ranIndex = parseInt(Math.random() * candidates.size, 10);
        const winner = keysArr[ranIndex];

        winners.set(winner, { author: winner, ...candidates.get(winner) });
    }

    winners.forEach(w => {
        if (process.env.HIDE_EMAIL_ON_CONSOLE == 'true') {
            const hideEmail =
                w.email && w.email.replace(/(\w+)@/.exec(w.email)[1].slice(0, 3), '***');
            console.log(chalk.green(`#${w.id} ${w.author} - ${hideEmail}`));
        } else {
            console.log(chalk.green(`#${w.id} ${w.author} - ${w.email}`));
        }
    });

    return Promise.resolve({ winners, candidateSize: candidates.size });
};

module.exports = pickWinners;
