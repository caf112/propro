import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/config/paths';
import * as Button from '@/components/ui/button';

const PlayRoute = () => {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const handleResultPage = () => {
    navigate(paths.game.single.result.getHref())
  }

  return (
    <div>
      <h1>Play</h1>
      <div>
        <p>Game</p>
        <p>Time Left: {timeLeft} seconds</p>
      </div>
      <div>
          <Button.ActionButton onClick={handleResultPage} label="回答" iconClass='result-icon' />
        </div>
    </div>
  )
}

export default PlayRoute