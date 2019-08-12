import fs from 'fs';

import { OutputTarget } from '../Summary';

export class TxtOutput implements OutputTarget {
    print(report: string | string[]): void {
        try {
            if (typeof report !== 'string') {
                report = report.join('\n\n---------------\n\n');
            }

            fs.writeFileSync('report.txt', report);
        } catch (e) {
            console.error(e);
        }
    }
}
