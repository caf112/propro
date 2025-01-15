import { DraggableWindow } from "@/components/ui/draggable-window"
import { BackGroundLayout } from "@/components/layouts/background/background"
import { Outlet } from "react-router-dom"


const MyPageRoot = () => {
  
  return (
      <BackGroundLayout>
        <DraggableWindow title="mypage" defaultX={150} defaultY={-700}>
          <Outlet />
        </DraggableWindow>
      </BackGroundLayout>
  )
}

export default MyPageRoot