type ActionButtonProps = {
    onClick: () => void;
    label: string;
    icon: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, icon}) => {
  return (
    <button className="action-button" onClick={onClick}>
        <span className={`action-icon${icon}`} aria-hidden="true"></span>
        {label}
    </button>
  )
}

