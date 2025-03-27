import './loader.css'
import { imagePaths } from '@/config/paths'

export const Loader = () => {
  return (
    <div className="loader">
      <img src={imagePaths.loading.load2} alt="Loading..." />
      <p>Loading...</p>
    </div>
  )
}
