//gameTypes
export type CodeProblem = {
    id: number;
    title: string;
    description: string;
    code: CodeSections;
    blanks: Blank[];
}

type Blank = {
    id: string;
    placeholder: string;
    answer: string;
    choices: string[];
}

type CodeSections = {
    html: string[];
    css: string[];
    js: string[];
}