import { courseData } from './course-content';
import { Exercise, DifficultyLevel } from './types';

export function getRevisionQuestions(chapterId: string, difficulty: 'easy' | 'medium' | 'hard' | 'mixed'): Exercise[] {
    const chapter = courseData.chapters.find(c => c.id === chapterId);
    if (!chapter) return [];

    const exercises = chapter.sections
        .filter(s => s.type === 'exercises')
        .flatMap(s => s.exercises || []);

    // Shuffle array helper
    const shuffle = (array: Exercise[]) => array.sort(() => 0.5 - Math.random());

    if (difficulty === 'mixed') {
        // Select 2 easy, 2 medium, 1 hard = 5 total
        const easy = shuffle(exercises.filter(e => e.level === 'easy')).slice(0, 2);
        const medium = shuffle(exercises.filter(e => e.level === 'medium')).slice(0, 2);
        const hard = shuffle(exercises.filter(e => e.level === 'hard')).slice(0, 1);
        return shuffle([...easy, ...medium, ...hard]);
    } else {
        return shuffle(exercises.filter(e => e.level === difficulty)).slice(0, 5);
    }
}

export function getQuizQuestions(chapterId: string): Exercise[] {
    const chapter = courseData.chapters.find(c => c.id === chapterId);
    if (!chapter) return [];

    const exercises = chapter.sections
        .filter(s => s.type === 'exercises')
        .flatMap(s => s.exercises || []);

    const shuffle = (array: Exercise[]) => array.sort(() => 0.5 - Math.random());

    // For main quiz: 3 easy, 4 medium, 3 hard = 10 questions
    const easy = shuffle(exercises.filter(e => e.level === 'easy')).slice(0, 3);
    const medium = shuffle(exercises.filter(e => e.level === 'medium')).slice(0, 4);
    const hard = shuffle(exercises.filter(e => e.level === 'hard')).slice(0, 3);

    return shuffle([...easy, ...medium, ...hard]);
}
