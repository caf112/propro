import { Loader } from '@/components/ui/loader'
import { MultiEditor } from '@/features/game/multi/code'
import { useEditor } from '@/hooks/useEditor'

const MultiPlayRoute = () => {
  const { isLoading } = useEditor()

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <MultiEditor />
        </div>
      )}
    </div>
  )
}

export default MultiPlayRoute
