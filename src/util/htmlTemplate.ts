export const htmlTemplate = (report: string | string[]): string => {
    const head = `
<!DOCTYPE html>
<html>
<head>
    <title>Report</title>
    <style>
        body {
            margin: 0;
            display: flex;
            height: 100vh;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
    </style>
</head>
<body>
    <h1>Output</h1>
    <div id="report">

`;

    let body = '';
    if (typeof report !== 'string') {
        body += '<ul>';
        report.map(item => {
            body += `<li>${item}</li>`;
        });
        body += '</ul>';
    } else {
        body += report;
    }

    const tail = `
    </div>
</body>
</html>
`;

    return head + body + tail;
};
