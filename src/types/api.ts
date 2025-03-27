export type ScoreTypes = {
  attempt: number
  score: number
}

// **Room の型を修正**
export type RoomType = {
  id: string
  password: string
  messages: { id: string; message?: string; send_user?: string }[]
  members: { id: string; username?: string }[]
}

export interface CodeProblem {
  id: number
  title: string
  description: string
  code: CodeSections
  blanks: Blank[]
}

export interface Blank {
  id: string
  placeholder: string
  answer: string
  choices: string[]
}

export interface CodeSections {
  html: string[]
  css: string[]
  js: string[]
}

export interface CodeProblemProps {
  problemData: CodeProblem
}
