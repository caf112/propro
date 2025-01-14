import { Outlet } from "react-router-dom"

import { WindowLayout } from "@/components/layouts/window-layout"

const GameRoot = () => {
  return (
    <WindowLayout >
      <Outlet />
    </WindowLayout>
  )
}

export default GameRoot