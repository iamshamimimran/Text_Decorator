import React, { useEffect } from 'react';

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500); // Auto-dismiss after 2.5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  // Color mappings based on alert type
  const typeStyles = {
    Success: {
      borderColor: 'var(--accent-success)',
      icon: '✓',
      badgeColor: 'var(--accent-success)'
    },
    Info: {
      borderColor: 'var(--accent-secondary)',
      icon: 'ℹ',
      badgeColor: 'var(--accent-secondary)'
    },
    Warning: {
      borderColor: 'var(--accent-danger)',
      icon: '⚠',
      badgeColor: 'var(--accent-danger)'
    }
  };

  const style = typeStyles[type] || typeStyles.Info;

  return (
    <div 
      className="glass-panel d-flex align-items-center justify-content-between p-3"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        minWidth: '280px',
        maxWidth: '400px',
        borderColor: style.borderColor,
        borderWidth: '1.5px',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
        animation: 'toastIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <span 
          className="d-flex align-items-center justify-content-center font-monospace"
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: style.badgeColor,
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '13px'
          }}
        >
          {style.icon}
        </span>
        <div>
          <strong style={{ color: style.badgeColor, fontSize: '13px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {type}
          </strong>
          <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
            {message}
          </span>
        </div>
      </div>
      <button 
        className="btn p-0 border-0 ms-3"
        onClick={onClose}
        style={{
          color: 'var(--text-muted)',
          fontSize: '18px',
          background: 'none',
          lineHeight: '1',
          cursor: 'pointer',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
        onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
      >
        &times;
      </button>
    </div>
  );
}
