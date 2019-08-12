import chalk from 'chalk';

import { Analyzer } from '../Summary';

export class Random implements Analyzer {
    constructor(public data: string[]) {}

    run(nWinners: number): string[] {
        const length = this.data.length;
        const winners = new Set();

        if (nWinners >= length) {
            console.log(chalk.bgRed('Error: nWinners is more than or equal to nData'));
            return this.data;
        }

        while (winners.size < nWinners) {
            const ranIndex = Math.floor(Math.random() * length);
            winners.add(this.data[ranIndex]);
        }

        return Array.from(winners) as string[];
    }
}
