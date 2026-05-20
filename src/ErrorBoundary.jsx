import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('App crash:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0,
          background: '#050505', color: '#00ff41',
          fontFamily: 'monospace', padding: '40px',
          display: 'flex', flexDirection: 'column', gap: '16px',
          overflow: 'auto'
        }}>
          <h1 style={{ fontSize: '1.2rem', letterSpacing: '3px' }}>
            ▲ SYSTEM_ERROR: APP_CRASH_DETECTED
          </h1>
          <pre style={{ fontSize: '0.8rem', color: '#f87171', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.message}
          </pre>
          <pre style={{ fontSize: '0.7rem', color: '#888', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => { sessionStorage.clear(); window.location.reload(); }}
            style={{
              marginTop: '20px', padding: '10px 24px',
              background: 'transparent', border: '1px solid #00ff41',
              color: '#00ff41', fontFamily: 'monospace',
              cursor: 'pointer', width: 'fit-content'
            }}
          >
            REBOOT_SYSTEM()
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
