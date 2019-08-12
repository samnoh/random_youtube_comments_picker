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
        new Summary(new Random(data, num), new ConsoleOutput()).buildAndPrintReport();
    }

    static randomSelectWithHtmlReport(data: string[], num: number): void {
        new Summary(new Random(data, num), new HtmlOutput()).buildAndPrintReport();
    }

    static randomSelectWithTxtReport(data: string[], num: number): void {
        new Summary(new Random(data, num), new TxtOutput()).buildAndPrintReport();
    }

    constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

    buildAndPrintReport(): void {
        const output = this.analyzer.run();
        this.outputTarget.print(output);
    }
}
