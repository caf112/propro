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
    id: string;
    password: string;
    messages: { id: string; message?: string; send_user?: string }[];
    members: { id: string; username?: string }[];
  };