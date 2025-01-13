import { Outlet } from "react-router-dom"

const MyPageRoot = () => {
  return (
    <div>
        <h1>Mypage</h1>
        <Outlet />
    </div>
  )
}

export default MyPageRoot