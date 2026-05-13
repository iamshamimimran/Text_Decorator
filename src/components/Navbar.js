import React from 'react';

export default function Navbar({ title, theme, setTheme }) {
  const themesList = [
    { id: 'dark-space', name: 'Deep Space', color: '#a855f7' },
    { id: 'aurora-forest', name: 'Aurora Forest', color: '#10b981' },
    { id: 'minimalist-light', name: 'Minimalist Light', color: '#7367f0' }
  ];

  return (
    <nav 
      className="navbar navbar-expand-lg glass-panel py-3 px-4 mb-4"
      style={{
        position: 'sticky',
        top: '15px',
        zIndex: 1000,
        borderRadius: '16px',
        margin: '15px 15px 30px 15px',
        boxShadow: 'var(--panel-shadow)',
        background: 'var(--panel-bg)',
        borderColor: 'var(--panel-border)'
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between p-0">
        <a 
          className="navbar-brand glowing-title d-flex align-items-center gap-2 m-0" 
          href="/"
          style={{
            fontSize: '24px',
            textDecoration: 'none'
          }}
        >
          <span style={{ textShadow: '0 0 10px var(--accent-primary-glow)' }}>✨</span> {title}
        </a>

        {/* Tactical Custom Theme Selector Pill */}
        <div 
          className="d-flex align-items-center gap-3 p-1 px-3"
          style={{
            background: 'var(--textarea-bg)',
            borderRadius: '50px',
            border: '1px solid var(--panel-border)'
          }}
        >
          <span 
            style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            className="d-none d-sm-inline"
          >
            Theme
          </span>

          <div className="d-flex align-items-center gap-2">
            {themesList.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={t.name}
                className="border-0 p-0 transition-all"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: t.color,
                  cursor: 'pointer',
                  transform: theme === t.id ? 'scale(1.25)' : 'scale(0.85)',
                  boxShadow: theme === t.id 
                    ? `0 0 12px ${t.color}` 
                    : 'none',
                  opacity: theme === t.id ? 1 : 0.6,
                  border: theme === t.id ? '2px solid var(--text-primary)' : '1px solid rgba(0,0,0,0.1)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
