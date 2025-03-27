import { DraggableWindow } from '@/components/ui/draggable-window'
import { BackGroundLayout } from '@/components/layouts/background/background'
import { Outlet } from 'react-router-dom'

const MyPageRoot = () => {
  return (
    <BackGroundLayout>
      <DraggableWindow title="mypage">
        <Outlet />
      </DraggableWindow>
    </BackGroundLayout>
  )
}

export default MyPageRoot
