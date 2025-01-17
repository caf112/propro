import { BackGroundLayout } from '@/components/layouts/background/background'
import { TopContents } from '@/features/top/contents'


const TopRoute = () => {
  return (
    <div>
      <BackGroundLayout>
        <TopContents />
      </BackGroundLayout>
    </div>
  )
}

export default TopRoute