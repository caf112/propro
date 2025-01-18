import React from 'react'

export const GameScore: React.FC = () => {
  const totalScoreString = localStorage.getItem('totalBlank');
  const scoreString = localStorage.getItem('Score');

  const totalScore = totalScoreString ? parseInt(totalScoreString,10):0;
  const score = scoreString ? parseInt(scoreString,10) : 0;

  const normalizedScore = totalScore > 0 ? (score / totalScore) * 100 :0;

  return (
    <div>
      <h2>ゲームスコア</h2>
        <p>あなたのスコア:{normalizedScore}点({score}/{totalScoreString})</p>
        {/* <p>あなたのスコア:{normalizedScore}点({normalizedScore.toFixed(1)}%)</p> */}
    </div>
  )
}

