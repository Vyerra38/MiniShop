function Button ({children, onClick, type = 'button', className = '', backgroundColor = "#ffb6c1"}) {
  return (
    <button
     onClick={onClick} 
     style={{ 
        padding: '8px 12px',
        cursor:'pointer',
        backgroundColor: backgroundColor,
        border: '1px solid #333',
        borderRadius: '5px',
        fontWeight: 'bold'
      }}>
      {children}
    </button>
  );
}

export default Button;