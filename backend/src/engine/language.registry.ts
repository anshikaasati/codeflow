export type LanguageType = 'cpp' | 'python' | 'java' | 'javascript' | 'go' | 'rust';

export interface LanguageInfo {
    type: LanguageType;
    name: string;
    extension: string;
    isSupported: boolean; // Supported by compiler/execution/tracing engines
    pistonName?: string;
    pistonVersion?: string;
    wandboxName?: string;
}

export const LANGUAGE_REGISTRY: Record<LanguageType, LanguageInfo> = {
    cpp: {
        type: 'cpp',
        name: 'C++',
        extension: 'cpp',
        isSupported: true,
        pistonName: 'c++',
        pistonVersion: '10.2.0',
        wandboxName: 'gcc-head'
    },
    python: {
        type: 'python',
        name: 'Python',
        extension: 'py',
        isSupported: true,
        pistonName: 'python',
        pistonVersion: '3.10.0',
        wandboxName: 'cpython-head'
    },
    java: {
        type: 'java',
        name: 'Java',
        extension: 'java',
        isSupported: true, // Java support is enabled
        pistonName: 'java',
        pistonVersion: '15.0.2',
        wandboxName: 'openjdk-jdk-22+36'
    },
    javascript: {
        type: 'javascript',
        name: 'JavaScript',
        extension: 'js',
        isSupported: false,
        pistonName: 'javascript',
        pistonVersion: '18.15.0',
        wandboxName: 'node-head'
    },
    go: {
        type: 'go',
        name: 'Go',
        extension: 'go',
        isSupported: false,
        pistonName: 'go',
        pistonVersion: '1.16.2',
        wandboxName: 'go-head'
    },
    rust: {
        type: 'rust',
        name: 'Rust',
        extension: 'rs',
        isSupported: false,
        pistonName: 'rust',
        pistonVersion: '1.68.2',
        wandboxName: 'rust-head'
    }
};

export const getSupportedLanguages = (): LanguageType[] => {
    return Object.keys(LANGUAGE_REGISTRY).filter(
        key => LANGUAGE_REGISTRY[key as LanguageType].isSupported
    ) as LanguageType[];
};

export const getAllLanguages = (): LanguageType[] => {
    return Object.keys(LANGUAGE_REGISTRY) as LanguageType[];
};

export const isValidLanguage = (lang: string): boolean => {
    const clean = lang.toLowerCase();
    if (clean === 'c++') return true;
    return clean in LANGUAGE_REGISTRY;
};

export const normalizeLanguage = (lang: string): LanguageType => {
    const clean = lang.toLowerCase();
    if (clean === 'c++') return 'cpp';
    if (clean in LANGUAGE_REGISTRY) {
        return clean as LanguageType;
    }
    throw new Error(`Invalid language to normalize: ${lang}`);
};
