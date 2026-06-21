export interface SolutionVersion {
  title: 'Brute Force' | 'Better' | 'Optimal';
  description?: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface LanguageDefinition {
  starterCode: string;
  solutionCode: string;
  solutions?: SolutionVersion[];
}

export interface ProblemDefinition {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  patterns: string[];
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

