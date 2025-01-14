import { DraggableWindow } from "@/components/ui/draggable-window"
import { imagePaths } from "@/config/paths"
import { HandleIcons } from "@/features/top"
import { Outlet } from "react-router-dom"


const MyPageRoot = () => {

  console.log(imagePaths.logo)
  
  return (
      <HandleIcons>
        <DraggableWindow title="mypage">
          <Outlet />
        </DraggableWindow>
      </HandleIcons>
  )
}

export default MyPageRoot