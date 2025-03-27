import { questionPaths } from '@/config/paths'
import { useQuery } from '@tanstack/react-query'

export const useStage = () => {
  const stagesQuery = useQuery({
    queryKey: ['stage'],
    queryFn: async () => {
      const res = await fetch(questionPaths.easy)
      if (!res.ok) {
        throw new Error('ステージを取得できませんでした')
      }
      return res.json()
    },
  })

  return {
    stagesQuery,
    stages: stagesQuery.data,
    isLoading: stagesQuery.isLoading,
    error: stagesQuery.error,
  }
}
