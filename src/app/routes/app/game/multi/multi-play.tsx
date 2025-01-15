import { useState, useEffect } from 'react';

const PlayRoute = () => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  return (
    <div>
      <h1>Play</h1>
      <div>
        <p>Game</p>
        <p>Time Left: {timeLeft} seconds</p>
      </div>
    </div>
  )
}

export default PlayRoute