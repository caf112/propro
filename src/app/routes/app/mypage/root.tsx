import { Outlet } from "react-router-dom"

import { WindowLayout } from "@/components/layouts/window-layout"

const MyPageRoot = () => {
  return (
    <div>
      <WindowLayout>
        <Outlet />
      </WindowLayout>
    </div>
  )
}

export default MyPageRoot