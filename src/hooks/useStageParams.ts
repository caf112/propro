import { useSearchParams } from 'react-router-dom'

export const useStageParams = () => {
  const [searchParams] = useSearchParams()
  const stageParam = searchParams.get('stage')
  const stageNumberPram = stageParam ? parseInt(stageParam) : 1

  return { stageParam, stageNumberPram }
}
