import React from 'react'
import * as Button from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';
import { paths } from '@/config/paths';

export const GameScore: React.FC = () => {
  const navigate = useNavigate()

  const totalScoreString = localStorage.getItem('totalBlank');
  const scoreString = localStorage.getItem('Score');

  const totalScore = totalScoreString ? parseInt(totalScoreString,10):0;
  const score = scoreString ? parseInt(scoreString,10) : 0;

  const normalizedScore = totalScore > 0 ? (score / totalScore) * 100 :0;

  const handleStageSelectPage = () => {
    navigate(paths.game.single.stageSelector.getHref())
  }

  const handleTopPage = () => {
    navigate(paths.top.path)
  }

  return (
    <div>
      <h2>ゲームスコア</h2>
        <p>あなたのスコア:{normalizedScore}点({score}/{totalScoreString})</p>
        {/* <p>あなたのスコア:{normalizedScore}点({normalizedScore.toFixed(1)}%)</p> */}
      <Button.ActionButton onClick={handleStageSelectPage} label="ステージ選択へ" iconClass=''/>
      <Button.ActionButton onClick={handleTopPage} label="トップへ" iconClass=''/>
    </div>
  )
}

