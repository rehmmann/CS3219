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
    category: string;
    complexity: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}
