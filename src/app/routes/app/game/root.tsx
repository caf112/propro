import { DraggableWindow } from "@/components/ui/draggable-window"
import { Outlet } from "react-router-dom"

const GameRoot = () => {
  return (
    <DraggableWindow title="game">
      <Outlet />
    </DraggableWindow>
  )
}

export default GameRoot