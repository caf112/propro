import { DraggableWindow } from "@/components/ui/draggable-window"
import { HandleIcons } from "@/features/top"
import { Outlet } from "react-router-dom"

const GameRoot = () => {
  return (
    <HandleIcons>
      <DraggableWindow title="game">
        <Outlet />
      </DraggableWindow>
    </HandleIcons>
  )
}

export default GameRoot