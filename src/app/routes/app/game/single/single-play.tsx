import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { paths } from '@/config/paths';
import * as Game from '@/features/game/index'
import * as Button from '@/components/ui/button';
import * as Loader from '@/components/ui/loader';

const SinglePlayRoute = () => {
  const navigate = useNavigate()
  // const [timeLeft, setTimeLeft] = useState(60);

  // useEffect(() => {
  //   if (timeLeft > 0) {
  //     const timerId = setInterval(() => {
  //       setTimeLeft(timeLeft - 1);
  //     }, 1000);
  //     return () => clearInterval(timerId);
  //   }
  // }, [timeLeft]);

  const [isLoading,setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    },1000)

    return () => clearTimeout(timeout)
  },[location.pathname])

  const handleResultPage = () => {
    navigate(paths.game.single.result.getHref())
  }

  return (
    <div>
      <h1>Play</h1>
      {isLoading && <Loader.Loader />}
      {!isLoading && (
        <>
          <Game.CodeGame />
        </>
      )}
      <div>
          {/* <Button.ActionButton onClick={handleResultPage} label="回答" iconClass='result-icon' /> */}
        </div>
    </div>
  )
}

export default SinglePlayRoute