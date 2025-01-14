import React from 'react';
import Draggable from 'react-draggable';
import './draggable-window.css';

interface DesktopWindowProps {
    title: string;
    children: React.ReactNode;
  }

export const DraggableWindow: React.FC<DesktopWindowProps> = ({ title, children }) => {
  return (
    <Draggable>
        <div className="flame">
    <div className="background"></div>
    <img className="overlay-image" src="/desktop/window2.png" alt="Overlay" />
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
