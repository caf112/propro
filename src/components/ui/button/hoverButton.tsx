export const buttonStyle = (bgColor: string, hoverColor: string) => ({
  padding: '12px 24px',
  fontSize: '16px',
  borderRadius: '8px',
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  transition: '0.3s',
  onMouseOver: (e: React.MouseEvent<HTMLButtonElement>) =>
    (e.currentTarget.style.backgroundColor = hoverColor),
  onMouseOut: (e: React.MouseEvent<HTMLButtonElement>) =>
    (e.currentTarget.style.backgroundColor = bgColor),
})
