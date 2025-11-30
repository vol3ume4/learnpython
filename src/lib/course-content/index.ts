import { Course } from '../types';
import { variablesChapter } from './chapters/01-variables';
import { mathOperatorsChapter } from './chapters/02-math-operators';
import { dataTypesChapter } from './chapters/03-data-types';
import { stringsChapter } from './chapters/04-strings';
import { ifStatementsChapter } from './chapters/05-if-statements';
import { forLoopsChapter } from './chapters/06-for-loops';
import { whileLoopsChapter } from './chapters/07-while-loops';
import { functionsBasicsChapter } from './chapters/08-functions-basics';
import { functionsScopeChapter } from './chapters/09-functions-scope';
import { listsBasicsChapter } from './chapters/10-lists-basics';

export const courseData: Course = {
    id: "python-foundations",
    title: "Python Foundations",
    description: "Master Python basics through 10% theory and 90% practice",
    chapters: [
        variablesChapter,
        mathOperatorsChapter,
        dataTypesChapter,
        stringsChapter,
        ifStatementsChapter,
        forLoopsChapter,
        whileLoopsChapter,
        functionsBasicsChapter,
        functionsScopeChapter,
        listsBasicsChapter
    ]
};
