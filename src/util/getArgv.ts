import chalk from 'chalk';

export const url: string = process.argv[2];
export const nWinners: number = process.argv[3] ? parseInt(process.argv[3], 10) : 1;

if (!url) {
    console.error(chalk.bgRed('No Url'));
    process.exit(1);
}
