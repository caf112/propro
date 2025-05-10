import { useQuery } from '@tanstack/react-query'
import { useStage } from './useStage'

export const useCode = (stageNum: number) => {
  const { stagesQuery } = useStage()

  const codeQuery = useQuery({
    queryKey: ['code', stageNum],
    queryFn: async () => {
      if (!stagesQuery.data) {
        console.error('❌ stagesQuery.data が `undefined` です')
        throw new Error('stagesQueryがない')
      }

      if (!stageNum) {
        console.error('❌ stageNum が `undefined` です')
        throw new Error('stageNumがない')
      }

      const stageData = stagesQuery.data.find((stage: { id: number }) => stage.id === stageNum)

      if (!stageData) {
        console.error('❌ stageNum に対応するデータが `stagesQuery.data` にありません')
        // console.log("📌 全てのステージ:", stagesQuery.data);
        throw new Error('該当データがありません')
      }

      // console.log("✅ codeQuery - 取得した stageData:", stageData);
      return stageData
    },
    enabled: !!stagesQuery.data && stageNum !== undefined,
  })

  return {
    codeQuery,
    isLoading: codeQuery.isLoading,
    error: codeQuery.error,
  }
}
