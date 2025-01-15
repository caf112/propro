import { BackGroundLayout } from '@/components/layouts/background/background'
import { imagePaths } from '@/config/paths'
import { TopContents } from '@/features/top/contents'


const TopRoute = () => {
  console.log(imagePaths.logo)
  return (
    <div>
      <BackGroundLayout>
        <TopContents />
      </BackGroundLayout>
    </div>
  )
}

export default TopRoute