import Draggable from 'react-draggable'

interface DesktopWindowProps {
  title: string
  children: React.ReactNode
  imageUrl: string
}

const DesktopWindow: React.FC<DesktopWindowProps> = ({ title, children, imageUrl }) => {
  return (
    <Draggable>
      <div className="window">
        <div className="window-header">
          <h4>{title}</h4>
        </div>
        <div className="window-content" style={{ backgroundImage: `url(${imageUrl})` }}>
          {children}
        </div>
      </div>
    </Draggable>
  )
}

const App = () => {
  return (
    <div className="desktop">
      <DesktopWindow title="Window 1" imageUrl="/path/to/image1.jpg">
        <p>Content of Window 1</p>
      </DesktopWindow>
      <DesktopWindow title="Window 2" imageUrl="/path/to/image2.jpg">
        <p>Content of Window 2</p>
      </DesktopWindow>
    </div>
  )
}

export default App
