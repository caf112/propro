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



export type StageProps = {
    stageNumber: number,
    title: string,
    description: string,
    code: CodeTypes,
    blanks: BlankTypes[],
    // userResponses: UserResponsesTypes;
    score: ScoreTypes,
}

type CodeTypes = {
    htmlCode: string | string[],
    cssCode: string | string[],
    jsCode: string | string[],
}

type BlankTypes = {
    blankKey: string;
    placeholder: string,
    answer: string,
    choices: string[],
}

// type UerResponsesTypes = {
//     userResponses: string | string[] | null,
// }

export type ScoreTypes = {
    attempt: number,
    score: number;

}

// **Room の型を修正**
export type RoomType = {
    room_id: number;
    password: string;
    messages: { room_id: number; message?: string; send_user?: string }[];
    members: { room_id: number; username?: string }[];
  };