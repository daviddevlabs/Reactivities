import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './app/Layout/styles.css'
import { store, StoreContext } from './app/stores/store'
import { router } from './app/router/route'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </StrictMode>,
)
