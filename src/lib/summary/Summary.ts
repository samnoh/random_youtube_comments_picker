import { ConsoleOutput, HtmlOutput, TxtOutput } from './reports';
import { Random } from './analyzers';

export interface Analyzer {
    run(): string[];
}

export interface OutputTarget {
    print(report: string | string[]): void;
}

export class Summary {
    static randomSelectWithConsoleReport(data: string[], num: number): void {
        new Summary(new Random(data, num), new ConsoleOutput()).build();
    }

    static randomSelectWithHtmlReport(data: string[], num: number): void {
        new Summary(new Random(data, num), new HtmlOutput()).build();
    }

    static randomSelectWithTxtReport(data: string[], num: number): void {
        new Summary(new Random(data, num), new TxtOutput()).build();
    }

    static randomSelectWithConsoleAndTxtReport(data: string[], num: number): void {
        new Summary(new Random(data, num), new ConsoleOutput(), new TxtOutput()).build();
    }

    public outputTarget: OutputTarget[];

    constructor(public analyzer: Analyzer, ...outputTarget: OutputTarget[]) {
        this.outputTarget = [...outputTarget];
    }

    build(): void {
        const output = this.analyzer.run();
        this.outputTarget.map(target => {
            target.print(output);
        });
    }
}
