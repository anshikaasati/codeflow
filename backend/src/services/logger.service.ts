import * as fs from 'fs';
import * as path from 'path';

export interface LogEvent {
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR';
    category: 'COMPILER' | 'TRACE' | 'VISUALIZATION' | 'API';
    message: string;
    details?: any;
}

export class LoggerService {
    private static logDir = path.resolve(__dirname, '../../../logs');
    private static logFile = path.join(LoggerService.logDir, 'codeflow.log');

    public static log(
        level: 'INFO' | 'WARN' | 'ERROR',
        category: 'COMPILER' | 'TRACE' | 'VISUALIZATION' | 'API',
        message: string,
        details?: any
    ) {
        const event: LogEvent = {
            timestamp: new Date().toISOString(),
            level,
            category,
            message,
            details
        };

        const logStr = JSON.stringify(event);
        console.log(`[${event.timestamp}] [${event.level}] [${event.category}] ${event.message}`, details ? JSON.stringify(details) : '');

        try {
            if (!fs.existsSync(LoggerService.logDir)) {
                fs.mkdirSync(LoggerService.logDir, { recursive: true });
            }
            fs.appendFileSync(LoggerService.logFile, logStr + '\n', 'utf-8');
        } catch (err) {
            console.error("LoggerService failed to write to file:", err);
        }
    }

    public static info(category: 'COMPILER' | 'TRACE' | 'VISUALIZATION' | 'API', message: string, details?: any) {
        this.log('INFO', category, message, details);
    }

    public static warn(category: 'COMPILER' | 'TRACE' | 'VISUALIZATION' | 'API', message: string, details?: any) {
        this.log('WARN', category, message, details);
    }

    public static error(category: 'COMPILER' | 'TRACE' | 'VISUALIZATION' | 'API', message: string, details?: any) {
        this.log('ERROR', category, message, details);
    }
}
