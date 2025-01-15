import { DraggableWindow } from "@/components/ui/draggable-window"
import { imagePaths } from "@/config/paths"
import { BackGroundLayout } from "@/components/layouts/background/background"
import { Outlet } from "react-router-dom"


const MyPageRoot = () => {

  console.log(imagePaths.logo)
  
  return (
      <BackGroundLayout>
        <DraggableWindow title="mypage">
          <Outlet />
        </DraggableWindow>
      </BackGroundLayout>
  )
}

export default MyPageRoot