import { imagePaths } from '@/config/paths'
import { useEffect, useState } from 'react'

export const WaitingSelect = () => {
  const [randomImage, setRandomImage] = useState('')

  useEffect(() => {
    const images = Object.values(imagePaths.usa)
    const randomIndex = Math.floor(Math.random() * images.length)
    setRandomImage(images[randomIndex])
  }),
    []

  return (
    <div>
      <img src={randomImage} alt="Waiting character" />
      <h2>ホストがステージを選択中・・・</h2>
    </div>
  )
}
