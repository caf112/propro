import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Loader from '@/components/ui/loader';
import { CodeGame } from '@/features/game/game';

const SinglePlayRoute = () => {
  
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

 

  return (
    <div>
      <h1>Play</h1>
      {isLoading && <Loader.Loader />}
      {!isLoading && (
        <>
          <CodeGame />
        </>
      )}
      <div>
          {/* <Button.ActionButton onClick={handleResultPage} label="回答" iconClass='result-icon' /> */}
        </div>
    </div>
  )
}

export default SinglePlayRoute