import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store'; // Make sure this path is correct
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
<BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="*" element={<App />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
