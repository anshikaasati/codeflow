export interface LanguageDefinition {
  starterCode: string;
  solutionCode?: string;
}

export interface ProblemDefinition {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  url: string;
  languages: Record<string, LanguageDefinition>;
  description?: string;
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints?: string[];
}

