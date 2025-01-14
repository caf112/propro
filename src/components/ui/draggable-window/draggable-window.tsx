import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import './draggable-window.css';
import { imagePaths } from '@/config/paths';

interface DesktopWindowProps {
    title: string;
    children: React.ReactNode;
  }

export const DraggableWindow: React.FC<DesktopWindowProps> = ({ title, children }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <Draggable nodeRef={nodeRef}>
        <div className="flame" ref={nodeRef}>
    <div className="background"></div>
    <img className="overlay-image" src={imagePaths.desktop.window} alt="Overlay" />
    <div className="window">
        <div className="window-header">
            <h4>{title}</h4>
        </div>
        <div className="window-content">{children}</div>
    </div>
</div>
    </Draggable>
  );
};
