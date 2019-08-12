import { OutputTarget } from '../Summary';

export class ConsoleOutput implements OutputTarget {
    print(report: string | string[]): void {
        if (Array.isArray(report)) report.map(r => console.log(r));
        else console.log(report);
    }
}
