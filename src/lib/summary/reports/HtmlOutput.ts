import fs from 'fs';

import { OutputTarget } from '../Summary';
import { htmlTemplate } from '../../../util';

export class HtmlOutput implements OutputTarget {
    print(report: string | string[]): void {
        const html = htmlTemplate(report);

        try {
            fs.writeFileSync('report.html', html);
        } catch (e) {
            console.error(e);
        }
    }
}
