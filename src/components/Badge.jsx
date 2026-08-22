function Badge({ text, backgroundColor="#ff6b6b" }) {
  return (
    <span style={{ 
      backgroundColor: backgroundColor,
      color: 'white',
      padding: '3px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    }}>
      {text}
     </span>
  );
}

export default Badge;