import * as fs from 'fs';
import * as path from 'path';

const PROBLEMS_DIR = path.join(__dirname, '../../../frontend/src/data/problems');

const getProblemFiles = (dir: string): string[] => {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getProblemFiles(filePath));
        } else if (file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts') {
            results.push(filePath);
        }
    });
    return results;
};

function runAnalysis() {
    const files = getProblemFiles(PROBLEMS_DIR);
    let total = files.length;
    let withPython = 0;
    let onlyCpp = 0;

    for (const f of files) {
        const content = fs.readFileSync(f, 'utf8');
        if (content.includes('starterCodePython')) {
            withPython++;
        } else {
            onlyCpp++;
        }
    }

    console.log(`Total problems: ${total}`);
    console.log(`With Python: ${withPython}`);
    console.log(`Only C++: ${onlyCpp}`);
}

runAnalysis();
