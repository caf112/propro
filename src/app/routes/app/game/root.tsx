import { DraggableWindow } from "@/components/ui/draggable-window"
import { BackGroundLayout } from "@/components/layouts/background/background"
import { Outlet } from "react-router-dom"

const GameRoot = () => {
  return (
    <BackGroundLayout>
      <DraggableWindow title="game">
        <Outlet />
      </DraggableWindow>
    </BackGroundLayout>
  )
}

export default GameRoot