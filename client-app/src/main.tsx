import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/Layout/App'
import 'semantic-ui-css/semantic.min.css'
import './app/Layout/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
