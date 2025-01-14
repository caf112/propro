import { DraggableWindow } from "@/components/ui/draggable-window"
import { Outlet } from "react-router-dom"

// import { WindowLayout } from "@/components/layouts/window-layout"

const MyPageRoot = () => {
  return (
    <div>
      {/* <WindowLayout> */}
      <DraggableWindow title="mypage">
        <Outlet />
      </DraggableWindow>
      {/* </WindowLayout> */}
    </div>
  )
}

export default MyPageRoot