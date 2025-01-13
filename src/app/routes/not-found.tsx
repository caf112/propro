import { paths } from "@/config/paths"
import { Link } from "react-router-dom"

const NotFoundRoute = () => {
  return (
    <div>
        <h1>NotFoundPage</h1>
        <img src="../../character/usa_cry.png" alt="Not Found" />
        <div>
            <Link to={paths.Top.path} replace>Topへ</Link>
        </div>
    </div>
  )
}

export default NotFoundRoute