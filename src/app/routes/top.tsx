import { imagePaths } from '@/config/paths'
import * as Tops from '@/features/top'


const TopRoute = () => {
  console.log(imagePaths.logo)
  return (
    <div>
      <Tops.HandleIcons />
      <Tops.TopContents />
    </div>
  )
}

export default TopRoute