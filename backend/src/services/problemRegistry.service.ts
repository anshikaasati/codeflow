import * as fs from 'fs';
import * as path from 'path';

export interface ProblemInfo {
    id: string;
    title: string;
    category: string;
    patterns: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

export class ProblemRegistryService {
    private static cache: Record<string, ProblemInfo> = {};
    private static initialized = false;

    private static getProblemsDir(): string {
        const pathsToTry = [
            path.join(__dirname, '../../../../frontend/src/data/problems'),
            path.join(__dirname, '../../../frontend/src/data/problems'),
            path.join(__dirname, '../../frontend/src/data/problems'),
            path.join(process.cwd(), 'frontend/src/data/problems'),
            path.join(process.cwd(), '../frontend/src/data/problems')
        ];

        for (const p of pathsToTry) {
            if (fs.existsSync(p)) {
                return p;
            }
        }
        
        // Fallback
        return path.join(process.cwd(), 'frontend/src/data/problems');
    }

    private static scanDirectory(dir: string, fileList: string[] = []): string[] {
        if (!fs.existsSync(dir)) return fileList;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                this.scanDirectory(filePath, fileList);
            } else if (file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts') {
                fileList.push(filePath);
            }
        }
        return fileList;
    }

    private static parseProblemFile(filePath: string): ProblemInfo | null {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Regex to match: id: "..." or id: '...'
            const idMatch = content.match(/\bid\s*:\s*["']([^"']+)["']/);
            // Regex to match: title: "..." or title: '...'
            const titleMatch = content.match(/\btitle\s*:\s*["']([^"']+)["']/);
            // Regex to match: category: "..." or category: '...'
            const categoryMatch = content.match(/\bcategory\s*:\s*["']([^"']+)["']/);
            // Regex to match: difficulty: "..." or difficulty: '...'
            const difficultyMatch = content.match(/\bdifficulty\s*:\s*["']([^"']+)["']/);
            
            if (!idMatch) return null;
            
            const id = idMatch[1];
            const title = titleMatch ? titleMatch[1] : id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            const category = categoryMatch ? categoryMatch[1] : 'Unknown';
            const difficulty = (difficultyMatch ? difficultyMatch[1] : 'Easy') as 'Easy' | 'Medium' | 'Hard';
            
            // Parse patterns array if present: patterns: [ "...", "..." ]
            const patterns: string[] = [];
            const patternsMatch = content.match(/\bpatterns\s*:\s*\[([\s\S]*?)\]/);
            if (patternsMatch) {
                const inner = patternsMatch[1];
                const parts = inner.split(',');
                for (let part of parts) {
                    part = part.trim().replace(/["']/g, '');
                    if (part) patterns.push(part);
                }
            }

            return { id, title, category, patterns, difficulty };
        } catch (e) {
            console.error(`Failed to parse problem file ${filePath}:`, e);
            return null;
        }
    }

    public static initialize(): void {
        if (this.initialized) return;
        
        try {
            const problemsDir = this.getProblemsDir();
            const filePaths = this.scanDirectory(problemsDir);
            
            for (const filePath of filePaths) {
                const info = this.parseProblemFile(filePath);
                if (info) {
                    this.cache[info.id] = info;
                }
            }
            this.initialized = true;
            console.log(`[ProblemRegistry] Loaded ${Object.keys(this.cache).length} problems from registry.`);
        } catch (e) {
            console.error('[ProblemRegistry] Failed to initialize:', e);
        }
    }

    public static getProblem(id: string): ProblemInfo | undefined {
        this.initialize();
        return this.cache[id];
    }

    public static getAllProblems(): ProblemInfo[] {
        this.initialize();
        return Object.values(this.cache);
    }
}
