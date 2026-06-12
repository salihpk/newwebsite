import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

// After a new deploy, open tabs still reference old hashed chunk filenames
// that no longer exist on the server. Vite fires vite:preloadError when a
// lazy import fails — reload once to fetch the fresh asset manifest.
// Only preventDefault when actually reloading: suppressing the error
// without a reload lets the page render with missing CSS.
window.addEventListener('vite:preloadError', (event) => {
  const KEY = 'chunk-reload-at'
  const last = Number(sessionStorage.getItem(KEY) || 0)
  if (Date.now() - last > 10000) {
    event.preventDefault()
    sessionStorage.setItem(KEY, String(Date.now()))
    window.location.reload()
  }
  // Guard active → let the error propagate to the ErrorBoundary,
  // whose REBOOT button clears sessionStorage and hard-reloads.
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>,
)
