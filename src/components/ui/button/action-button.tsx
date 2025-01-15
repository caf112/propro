type ActionButtonProps = {
    onClick: () => void;
    label: string;
    iconClass: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, iconClass}) => {
  return (
    <button className="action-button" onClick={onClick}>
        <span className={`action-icon${iconClass}`} aria-hidden="true"></span>
        {label}
    </button>
  )
}

