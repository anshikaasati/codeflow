import { IExecutor } from './executor.interface';
import { Executor as CppExecutor } from './languages/cpp/executor';
import { Executor as PythonExecutor } from './languages/python/executor';
import { Executor as JavaExecutor } from './languages/java/executor';
import { CodeValidator } from '../services/validation.service';
import { PythonValidator } from './languages/python/validator';
import { JavaValidator } from './languages/java/validator';
import { normalizeLanguage, LANGUAGE_REGISTRY } from './language.registry';

export class LanguageFactory {
    public static getExecutor(language: string): IExecutor {
        const lang = normalizeLanguage(language);
        if (!LANGUAGE_REGISTRY[lang]?.isSupported) {
            throw new Error(`Language executor not supported for: ${language}`);
        }
        if (lang === 'python') {
            return new PythonExecutor();
        } else if (lang === 'cpp') {
            return new CppExecutor();
        } else if (lang === 'java') {
            return new JavaExecutor();
        }
        throw new Error(`Unsupported language executor: ${language}`);
    }

    public static getValidator(language: string): any {
        const lang = normalizeLanguage(language);
        if (!LANGUAGE_REGISTRY[lang]?.isSupported) {
            throw new Error(`Language validator not supported for: ${language}`);
        }
        if (lang === 'python') {
            return new PythonValidator();
        } else if (lang === 'cpp') {
            return new CodeValidator();
        } else if (lang === 'java') {
            return new JavaValidator();
        }
        throw new Error(`Unsupported language validator: ${language}`);
    }
}
