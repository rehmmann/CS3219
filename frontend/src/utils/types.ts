export type QuestionComplexity = 'Easy' | 'Medium' | 'Hard';
export const QuestionCategories = [
    "Arrays", "Bit Manipulation",
  "Strings", "Brainteaser", "Data Structures", "Algorithms", "Recursion", "Databases"
];

export type QuestionCategory = typeof QuestionCategories[number];

export type User = {
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export type Question = {
    id: string;
    title: string;
    description: string;
    category: QuestionCategory[];
    complexity: QuestionComplexity;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

export type UpdateQuestion = {
    id: string;
    title: string;
    description: string;
    category: QuestionCategory[];
    complexity: QuestionComplexity;
}
