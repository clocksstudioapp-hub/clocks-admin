import React from 'react'

// Evita que un throw en cualquier componente deje el panel en blanco (BUG-003).
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    // TODO(OPS-001): enviar a Sentry cuando se integre.
    console.error('UI error:', error, info?.componentStack)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: "'DM Sans',system-ui,sans-serif", background: '#F5F3FF', color: '#1A0A3B', textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 44 }}>🛠️</div>
          <h2 style={{ fontSize: 22, fontWeight: 900 }}>Algo ha fallado</h2>
          <p style={{ color: '#5B4B8A', maxWidth: 380 }}>Ha ocurrido un error inesperado en el panel. Recarga la página; si persiste, inténtalo más tarde.</p>
          <button onClick={() => window.location.reload()} style={{ fontFamily: 'inherit', fontSize: 14, fontWeight: 700, padding: '10px 22px', color: '#fff', background: 'linear-gradient(135deg,#6D28D9,#A855F7)', border: 'none', borderRadius: 9, cursor: 'pointer' }}>Recargar</button>
        </div>
      )
    }
    return this.props.children
  }
}
