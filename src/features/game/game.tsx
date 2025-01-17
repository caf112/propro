import React, { useState,useEffect } from 'react';
import {CodeProblemComponent} from './problem';
import codeProblemsData from './datas/CodeQuestions.json';
import {CodeProblem} from '@/types/api';


export const CodeGame: React.FC = () => {
  const [problems, setProblems] = useState<CodeProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    // 問題の配列をシャッフルしてステートに設定
    const shuffledProblems = shuffleArray(codeProblemsData);
    setProblems(shuffledProblems);
  }, []);

  const handleComplete = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      alert('全ての問題を解きました！お疲れ様でした。');
      // 必要に応じてリセットや他の処理を行う

      const shuffledProblems = shuffleArray(codeProblemsData);
    setProblems(shuffledProblems);
    setCurrentProblemIndex(0);
    }
  };

  if (problems.length === 0) {
    // 問題がまだロードされていない場合の処理
    return <div>読み込み中...</div>;
  }

  const currentProblem = problems[currentProblemIndex];

  return (
    <div>
      <CodeProblemComponent problemData={currentProblem} onComplete={handleComplete} />
    </div>
  );
};


