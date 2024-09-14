import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css"
import './app/Layout/styles.css'
import { store, StoreContext } from './app/stores/store'
import { router } from './app/router/Routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </StrictMode>,
)
