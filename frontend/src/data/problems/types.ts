export interface SolutionApproach {
  title: string;
  code: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface LanguageDefinition {
  starterCode: string;
  bruteSolution: SolutionApproach;
  betterSolution: SolutionApproach;
  optimalSolution: SolutionApproach;
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

