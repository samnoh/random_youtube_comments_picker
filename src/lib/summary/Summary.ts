import { ConsoleOutput } from './reports';
import { Random } from './analyzers';

export interface Analyzer {
    run(num?: number): string[];
}

export interface OutputTarget {
    print(report: string | string[]): void;
}

export class Summary {
    static randomSelectWithConsoleReport(data: string[]): Summary {
        return new Summary(new Random(data), new ConsoleOutput());
    }

    constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

    buildAndPrintReport(num: number): void {
        const output = this.analyzer.run(num);
        this.outputTarget.print(output);
    }
}
