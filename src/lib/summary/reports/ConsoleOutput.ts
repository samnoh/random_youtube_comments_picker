import { OutputTarget } from '../Summary';

export class ConsoleOutput implements OutputTarget {
    print(report: string | string[]): void {
        if (Array.isArray(report)) {
            let index = 0;
            const interval = setInterval(() => {
                console.log(report[index++]);

                if (index >= report.length) {
                    clearInterval(interval);
                }
            }, 500);
        } else console.log(report);
    }
}
