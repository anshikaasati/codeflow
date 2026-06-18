import { IExecutor } from './executor.interface';
import { Executor as CppExecutor } from './languages/cpp/executor';
import { Executor as PythonExecutor } from './languages/python/executor';
import { CodeValidator } from '../services/validation.service';
import { PythonValidator } from './languages/python/validator';

export class LanguageFactory {
    public static getExecutor(language: string): IExecutor {
        const lang = language.toLowerCase();
        if (lang === 'python') {
            return new PythonExecutor();
        } else if (lang === 'cpp' || lang === 'c++') {
            return new CppExecutor();
        }
        throw new Error(`Unsupported language executor: ${language}`);
    }

    public static getValidator(language: string): any {
        const lang = language.toLowerCase();
        if (lang === 'python') {
            return new PythonValidator();
        } else if (lang === 'cpp' || lang === 'c++') {
            return new CodeValidator();
        }
        throw new Error(`Unsupported language validator: ${language}`);
    }
}
