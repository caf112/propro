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

export const DraggableWindow: React.FC<DesktopWindowProps> = ({ title, children, defaultX = 150, defaultY = -670 }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

return (
    <Draggable 
      nodeRef={nodeRef}
      defaultPosition={{ x: defaultX, y: defaultY }}
    >
      <div className="flame" ref={nodeRef}>
        <img className="overlay-image" src={imagePaths.desktop.window} alt="Overlay" />
        
          <div className="window">
            <div className="window-header">
              <img className="page-icon" src={headerIcon(title)} alt={title} />
              <h4>{title}</h4>
            </div>
            <div className="window-content">{children}</div>
          </div>

      </div>
    </Draggable>
  );
};
