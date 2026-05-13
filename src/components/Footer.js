import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
   
  return (
    <footer 
      className="text-center py-4 px-3 mt-5 glass-panel"
      style={{
        borderRadius: '16px',
        margin: '30px 15px 15px 15px',
        background: 'var(--panel-bg)',
        borderColor: 'var(--panel-border)',
        boxShadow: 'var(--panel-shadow)',
        fontSize: '14px',
        color: 'var(--text-secondary)'
      }}
    >
      <p className="m-0 font-monospace">
        &copy; {currentYear} || Crafted with{' '}
        <span 
          style={{ 
            color: 'var(--accent-danger)', 
            display: 'inline-block',
            animation: 'pulseGlow 2s infinite',
            fontSize: '15px'
          }}
        >
          ❤
        </span>{' '}
        by{' '}
        <a 
          href="https://github.com/iamshamimimran" 
          target="_blank" 
          rel="noopener noreferrer"
          className="transition-all"
          style={{
            color: 'var(--accent-primary)',
            textDecoration: 'none',
            fontWeight: '600'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary-hover)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--accent-primary)'}
        >
          lunatic.exe
        </a>
      </p>
    </footer>
  );
}
