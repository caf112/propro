import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import './draggable-window.css';
import { imagePaths } from '@/config/paths';

interface DesktopWindowProps {
    title: string;
    children: React.ReactNode;
    defaultX?: number;
    defaultY?: number;
  }
  
  const headerIcon = ((title: string) => {
    if (title == "game") {
      return imagePaths.favicon
    } 
    if (title == "mypage") {
      return imagePaths.icon.mypage
    }
  })

export const DraggableWindow: React.FC<DesktopWindowProps> = ({ title, children, defaultX = 150, defaultY = -700 }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

return (
    <Draggable 
      nodeRef={nodeRef}
      defaultPosition={{ x: defaultX, y: defaultY }}
    >
      <div className="flame" ref={nodeRef}>
        <div className="background"></div>
        <img className="overlay-image" src={imagePaths.desktop.window} alt="Overlay" />

          <div className="window">
            <div className="window-header">
              <img className="page-icon" src={headerIcon(title)} alt={title} />
              <h4>{title}</h4>
              {/* <div className="window-controls">
                <button className="minimize" title="Minimize"></button>
                <button className="maximize" title="Maximize"></button>
                <button className="close" title="Close"></button>
              </div> */}
            </div>
            <div className="window-content">{children}</div>
          </div>

      </div>
    </Draggable>
  );
};
