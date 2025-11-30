export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type Exercise = {
    id: string;
    question: string;
    starterCode: string;
    hint: string;
    solution: string;
    expectedOutput: string;
    level: DifficultyLevel;
};

export type Example = {
    code: string;
    explanation: string;
};

export type Section = {
    id: string;
    title: string;
    type: 'theory' | 'examples' | 'exercises' | 'quiz';
    content?: string; // For theory
    examples?: Example[]; // For examples section
    exercises?: Exercise[]; // For exercises section
};

export type Chapter = {
    id: string;
    title: string;
    description: string;
    sections: Section[];
    comingSoon?: boolean;
};

export type Course = {
    id: string;
    title: string;
    description: string;
    chapters: Chapter[];
};
