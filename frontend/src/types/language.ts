export type LanguageType = 'cpp' | 'python' | 'java' | 'javascript' | 'go' | 'rust';

export const LanguageType = {
    CPP: 'cpp' as const,
    PYTHON: 'python' as const,
    JAVA: 'java' as const,
    JAVASCRIPT: 'javascript' as const,
    GO: 'go' as const,
    RUST: 'rust' as const
};

export interface LanguageInfo {
    type: LanguageType;
    name: string;
    label: string;
    isSupported: boolean;
    extension: string;
}

export const LANGUAGE_REGISTRY: Record<LanguageType, LanguageInfo> = {
    [LanguageType.CPP]: {
        type: LanguageType.CPP,
        name: 'C++',
        label: 'C++',
        isSupported: true,
        extension: 'cpp'
    },
    [LanguageType.PYTHON]: {
        type: LanguageType.PYTHON,
        name: 'Python',
        label: 'Python',
        isSupported: true,
        extension: 'py'
    },
    [LanguageType.JAVA]: {
        type: LanguageType.JAVA,
        name: 'Java',
        label: 'Java (Soon)',
        isSupported: false,
        extension: 'java'
    },
    [LanguageType.JAVASCRIPT]: {
        type: LanguageType.JAVASCRIPT,
        name: 'JavaScript',
        label: 'JS (Soon)',
        isSupported: false,
        extension: 'js'
    },
    [LanguageType.GO]: {
        type: LanguageType.GO,
        name: 'Go',
        label: 'Go (Soon)',
        isSupported: false,
        extension: 'go'
    },
    [LanguageType.RUST]: {
        type: LanguageType.RUST,
        name: 'Rust',
        label: 'Rust (Soon)',
        isSupported: false,
        extension: 'rs'
    }
};

export const getLanguageDefaultCode = (type: LanguageType): string => {
    switch (type) {
        case LanguageType.PYTHON:
            return `class Solution:\n    def solve(self):\n        # Write your code here\n        pass\n\nif __name__ == "__main__":\n    sol = Solution()\n    print(sol.solve())\n`;
        case LanguageType.CPP:
        default:
            return `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`;
    }
};
